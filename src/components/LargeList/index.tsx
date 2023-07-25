import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { RefreshControl } from '@sdcx/pull-to-refresh';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { Box, Center, Flex, helpers, Indicator, Text, useTheme } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';

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
  renderItem,
  renderEmpty,
  renderHeader,
  renderFooter,
  renderSeparator,
  onEndReachedThreshold = 0.2,
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
> & {
  data?: Page<T>;
  loading?: boolean;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  renderHeader?: () => JSX.Element | null;
  renderFooter?: () => JSX.Element | null;
  renderEmpty?: (height?: number) => JSX.Element | null;
  renderSeparator?: () => JSX.Element | null;
  onRefresh?: () => void;
  onEndReachedThreshold?: number;
  estimatedItemSize: number;
}) {
  const theme = useTheme<AppTheme>();

  const [height, setHeight] = useSafeState(0);
  const [refreshing, setRefreshing] = useSafeState(false);
  const [loadingMore, setLoadingMore] = useSafeState(false);
  const [noMoreData, setNoMoreData] = useSafeState(false);
  const [list, setList] = useSafeState<T[]>([]);

  useEffect(() => {
    if (!data) return;

    const { page, pageSize, total, list = [] } = data;
    const noMoreData = page * pageSize >= total;
    if (page === 1) {
      setList(list);
    } else {
      setList(prev => [...prev, ...list]);
    }
    setNoMoreData(noMoreData);
  }, [data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh(); // 刷新数据
    setRefreshing(false);
  };

  const onEndReached = async () => {
    if (refreshing || loadingMore || noMoreData) return;
    setLoadingMore(true);
    await loadMore();
    setLoadingMore(false);
  };

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
          <ActivityIndicator size={'small'} />
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
        nestedScrollEnabled
        {...restProps}
        data={list}
        renderItem={renderItem}
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
        contentContainerStyle={{ padding: theme.spacing.x2 }}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Box>
  );
}
