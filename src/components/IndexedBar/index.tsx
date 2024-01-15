import { useMemo, useRef } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';

import { RefreshControl } from '@sdcx/pull-to-refresh';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { Box, Center, helpers, Indicator, Text, useTheme } from '@td-design/react-native';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { AppTheme } from '@/theme';

import { EnhancedPressable } from '../EnhancedTouchable';

const { px } = helpers;
const windowHeight = Dimensions.get('screen').height;

/**
 * 通讯录效果组件。
 */
export function IndexedBar<T extends Obj>({
  data,
  loading,
  refresh,
  indexHeight,
  itemHeight,
  headerHeight = 0,
  extractKey,
  renderIndex,
  renderItem,
  renderEmpty,
  renderSeparator,
  renderHeader,
  renderFooter,
  renderLetter,
  ...restProps
}: Omit<
  FlashListProps<T>,
  | 'data'
  | 'estimatedItemSize'
  | 'renderItem'
  | 'ListEmptyComponent'
  | 'ListFooterComponent'
  | 'ListHeaderComponent'
  | 'onRefresh'
  | 'refreshing'
> & {
  data: T[];
  loading: boolean;
  headerHeight?: number;
  indexHeight: number;
  itemHeight: number;
  extractKey: string;
  refresh: () => Promise<void>;
  renderIndex: (item: string) => JSX.Element;
  renderItem: (item: T) => JSX.Element;
  renderHeader?: () => JSX.Element | null;
  renderFooter?: (length: number) => JSX.Element | null;
  renderEmpty?: () => JSX.Element | null;
  renderSeparator?: (props: { leadingItem: string | T; trailingItem: string | T }) => JSX.Element | null;
  renderLetter?: (letter: string, index: number) => JSX.Element;
}) {
  const theme = useTheme<AppTheme>();
  const [refreshing, setRefreshing] = useSafeState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const length = data.length;
  const { list, letters, indices, heights } = useMemo(
    () => transformData(data, extractKey, itemHeight, indexHeight, headerHeight),
    [data, extractKey, itemHeight, indexHeight, headerHeight]
  );

  const listRef = useRef<FlashList<T> | null>(null);
  const [height, setHeight] = useSafeState(windowHeight);
  const [currentIndex, setCurrentIndex] = useSafeState(-1);

  // 分隔组件
  const ItemSeparatorComponent = (props: { leadingItem: string | T; trailingItem: string | T }) => {
    if (renderSeparator) {
      return renderSeparator(props);
    }
    return null;
  };

  // 列表数据为空的时候渲染的组件
  const ListEmptyComponent = refreshing ? null : renderEmpty?.();

  // 列表顶部组件
  const ListHeaderComponent = () => {
    if (!renderHeader) return null;

    return <Box height={headerHeight}>{renderHeader()}</Box>;
  };

  // 列表底部组件
  const ListFooterComponent = () => {
    if (refreshing) return null;
    if (renderFooter) {
      return renderFooter(length);
    }
    return null;
  };

  const RenderItemComponent = ({ item }: { item: string | T }) => {
    if (typeof item === 'string') return <Box height={indexHeight}>{renderIndex(item)}</Box>;
    return <Box height={itemHeight}>{renderItem(item)}</Box>;
  };

  const handlePress = useMemoizedFn((index: number) => {
    setCurrentIndex(index - 1);
    const indice = indices[index - 1];
    listRef.current?.scrollToIndex({ index: indice, animated: true });
  });

  const createLetter = (letter: string, index: number) => {
    if (renderLetter) return renderLetter(letter, index);
    return (
      <Box
        justifyContent={'center'}
        alignItems={'center'}
        width={px(20)}
        height={px(20)}
        borderRadius="x4"
        backgroundColor={currentIndex === index ? 'primary200' : 'white'}
      >
        <Text color={currentIndex === index ? 'white' : 'black'}>{letter}</Text>
      </Box>
    );
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY > headerHeight) {
      heights.forEach((item, index) => {
        const [start, end] = item;

        if (offsetY >= start && offsetY < end) {
          setCurrentIndex(index);
        }
      });
    } else {
      setCurrentIndex(0);
    }
  };

  if (loading && !refreshing)
    return (
      <Center>
        <Indicator.UIActivityIndicator color={theme.colors.primary200} size={helpers.px(24)} />
      </Center>
    );

  return (
    <>
      <FlashList
        nestedScrollEnabled
        {...restProps}
        ref={listRef}
        data={list as T[]}
        estimatedItemSize={itemHeight}
        renderItem={RenderItemComponent}
        getItemType={item => (typeof item === 'string' ? 'sectionHeader' : 'row')}
        stickyHeaderIndices={indices}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        viewabilityConfig={{
          waitForInteraction: true,
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 1000,
        }}
        onMomentumScrollEnd={handleScroll}
        onScroll={e => {
          if (e.nativeEvent.contentOffset.y === 0) {
            setCurrentIndex(0);
          }
        }}
        onScrollToTop={() => {
          setCurrentIndex(0);
        }}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <ScrollView
        style={{
          position: 'absolute',
          right: 8,
          top: (windowHeight - height) / 2 + headerHeight,
          height: '100%',
        }}
        onLayout={e => {
          setHeight(e.nativeEvent.layout.height);
        }}
      >
        {letters.map((letter, index) => (
          <EnhancedPressable key={letter} onPress={() => handlePress(index)}>
            {createLetter(letter, index)}
          </EnhancedPressable>
        ))}
      </ScrollView>
    </>
  );
}

/**
 * 根据原始数据和行高，计算出渲染列表、索引位置、字母表
 * @param data
 * @param extractKey
 * @param itemHeight
 * @param indexHeight
 * @param headerHeight
 * @returns
 */
function transformData<T extends Obj>(
  data: T[],
  extractKey: string,
  itemHeight: number,
  indexHeight: number,
  headerHeight: number
) {
  // 数据加工
  const result = data.reduce((map, item) => {
    const key = item[extractKey][0];
    const currentLetterContacts = map.get(key) ?? [];
    map.set(key, [...currentLetterContacts, item]);
    return map;
  }, new Map<string, T[]>());
  result.forEach((arr: T[], key: string, map: Map<string, T[]>) => {
    const sorted = arr.sort((a, b) => a[extractKey].localeCompare(b[extractKey]));
    map.set(key, sorted);
  });
  const sortedKeys = Array.from(result.keys()).sort((aKey, bKey) => aKey.localeCompare(bKey));
  const list = sortedKeys.flatMap(key => [key, ...(result.get(key) ?? [])]);

  // 得到索引和字母表
  const indices: number[] = [];
  const letters: string[] = [];
  list.forEach((item, index) => {
    if (typeof item === 'string') {
      indices.push(index);
      letters.push(item);
    }
  });

  // 计算每个字母对应的高度
  const heights: number[] = [headerHeight];
  sortedKeys.forEach(key => {
    let height = indexHeight;
    const items = result.get(key) ?? [];
    height += items.length * itemHeight;

    heights.push(height);
  });

  // 对每一项进行累加，后一项的值等于前一项的值+自己
  const accuHeights: number[] = [];
  heights.forEach((height, index) => {
    if (index === 0) {
      accuHeights.push(height);
    } else {
      accuHeights.push(height + accuHeights[index - 1]);
    }
  });

  // 转换成一个二维数组，方便判断区间
  const heightArray: [number, number][] = [];
  accuHeights.forEach((_, index, array) => {
    heightArray.push([array[index], array[index + 1]]);
  });
  // 删除最后一个
  heightArray.pop();

  return { list, letters, indices, heights: heightArray };
}
