import { ViewStyle } from 'react-native';

import { RefreshControl } from '@sdcx/pull-to-refresh';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { Box, Center, Flex, helpers, Indicator, Text, useTheme } from '@td-design/react-native';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { AppTheme } from '@/theme';

/**
 * 对FlashList进行封装。
 * 1. 其中`renderItem`返回的React组件最重要的是要把它以及它的子组件不能设置`key`属性；如果有`map`操作，请使用`index`；
 * 2. 如果`renderItem`返回的组件有多种情况，这时候需要配合`getItemType`一起进行优化。例如：
      ```
      const renderItem = ({ item }: { item: Message }) => {
        switch (item.type) {
          case MessageType.Text:
            return <Text>{item.text}</Text>;
          case MessageType.Image:
            return <Image source={item.image} />;
        }
      };

      return (
        <FlashList 
          renderItem={MessageItem} 
          getItemType={item => item.type} 
          estimatedItemSize={200} 
        />
      );
      ```
  * 3. 如果`renderItem`返回的组件里面有一些跟`item`无关的组件，这时候我们可以用`memo`把这个组件包一下，防止`re-render`:
      ```
        const HeavyComponent = () => {
          return ...;
        };

        const renderItem = ({ item }: { item: any }) => {
          // memoize这个跟item无关的组件
          const MemoizedHeavyComponent = memo(HeavyComponent);
          return (
            <>
              <MemoizedMyHeavyComponent />
              <Text>{item.title}</Text>
            </>
          );
        };
      ```
 */
export function LargeList<T>({
  data,
  refresh,
  loadMore,
  loading,
  estimatedItemSize,
  noMoreData,
  loadingMore,
  renderItem,
  renderEmpty,
  renderHeader,
  renderFooter,
  renderSeparator,
  onEndReachedThreshold = 0.2,
  keyExtractor,
  style,
  ...restProps
}: Omit<
  FlashListProps<T>,
  | 'data'
  | 'ListEmptyComponent'
  | 'ListFooterComponent'
  | 'ListHeaderComponent'
  | 'ItemSeparatorComponent'
  | 'onRefresh'
  | 'refreshing'
  | 'onEndReached'
  | 'onEndReachedThreshold'
  | 'estimatedItemSize'
  | 'keyExtractor'
> & {
  data?: T[];
  loading?: boolean;
  keyExtractor: keyof T;
  refresh: () => Promise<unknown>;
  loadMore: () => void;
  renderHeader?: () => JSX.Element | null;
  renderFooter?: () => JSX.Element | null;
  renderEmpty?: (height?: number) => JSX.Element | null;
  renderSeparator?: () => JSX.Element | null;
  noMoreData: boolean;
  loadingMore: boolean;
  onEndReachedThreshold?: number;
  estimatedItemSize: number;
  style?: ViewStyle;
}) {
  const theme = useTheme<AppTheme>();

  const [height, setHeight] = useSafeState(0);
  const [refreshing, setRefreshing] = useSafeState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refresh();
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setRefreshing(false);
    }
  };

  const onEndReached = () => {
    if (refreshing || loadingMore || noMoreData) return;
    loadMore();
  };

  const keyExtractorFn = useMemoizedFn((item: T, i: number) => `${i}-${item[keyExtractor]}`);

  // 列表数据为空的时候渲染的组件
  const ListEmptyComponent = refreshing ? null : renderEmpty?.(height);

  // 列表顶部组件
  const ListHeaderComponent = renderHeader?.();

  // 列表底部组件
  const ListFooterComponent = () => {
    if (refreshing) return null;
    if (renderFooter) renderFooter();

    if (loadingMore) {
      return (
        <Flex paddingVertical={'x2'} alignItems={'center'} justifyContent={'center'}>
          <Indicator.UIActivityIndicator color={theme.colors.primary200} size={helpers.px(24)} />
          <Text variant={'p1'} color="gray400">
            正在加载更多...
          </Text>
        </Flex>
      );
    }
    if (noMoreData) {
      return (
        <Flex paddingVertical={'x2'} alignItems={'center'} justifyContent={'center'}>
          <Text variant={'p1'} color="gray400">
            没有更多数据
          </Text>
        </Flex>
      );
    }
    return null;
  };

  // 列表分隔组件
  const ItemSeparatorComponent = () => {
    if (renderSeparator) return renderSeparator();
    return null;
  };

  if (loading && !refreshing && !loadingMore)
    return (
      <Center>
        <Indicator.UIActivityIndicator color={theme.colors.primary200} size={helpers.px(24)} />
      </Center>
    );

  return (
    <Box style={{ flex: 1 }} onLayout={event => setHeight(event.nativeEvent.layout.height)}>
      <FlashList
        {...restProps}
        nestedScrollEnabled
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={estimatedItemSize}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        viewabilityConfig={{
          waitForInteraction: true,
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 1000,
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={style ? style : { padding: theme.spacing.x3 }}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        keyExtractor={keyExtractorFn}
      />
    </Box>
  );
}
