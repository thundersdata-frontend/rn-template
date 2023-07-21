import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { RefreshControl } from '@sdcx/pull-to-refresh';
import { MasonryFlashList, MasonryFlashListProps } from '@shopify/flash-list';
import { Box, Center, Flex, helpers, Indicator, Text, useTheme } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';

import { AppTheme } from '@/theme';

/**
 * 瀑布流列表（每个item的高度可能都不一样，多用于feed流）。
 */
export function WaterfallList<T>({
  data,
  refresh,
  loadMore,
  loading,
  numColumns,
  estimatedItemSize,
  renderItem,
  renderEmpty,
  renderHeader,
  renderFooter,
  renderSeparator,
  onEndReachedThreshold = 0.15,
  ...restProps
}: Omit<
  MasonryFlashListProps<T>,
  | 'data'
  | 'ListEmptyComponent'
  | 'ListFooterComponent'
  | 'ListHeaderComponent'
  | 'onRefresh'
  | 'refreshing'
  | 'onEndReached'
  | 'onEndReachedThreshold'
  | 'estimatedItemSize'
> & {
  data?: Page<T>;
  loading: boolean;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  renderHeader?: () => JSX.Element | null;
  renderFooter?: () => JSX.Element | null;
  renderEmpty?: (height?: number) => JSX.Element | null;
  renderSeparator?: () => JSX.Element | null;
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
    await refresh();
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
      <MasonryFlashList
        {...restProps}
        data={list}
        numColumns={numColumns}
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
      />
    </Box>
  );
}
