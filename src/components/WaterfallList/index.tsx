import { ActivityIndicator } from 'react-native';

import { RefreshControl } from '@sdcx/pull-to-refresh';
import { MasonryFlashList, MasonryFlashListProps } from '@shopify/flash-list';
import { Flex, Text } from '@td-design/react-native';

/**
 * 瀑布流列表（每个item的高度可能都不一样，多用于feed流）。
 */
export function WaterfallList<T>({
  data,
  numColumns,
  estimatedItemSize,
  refreshing = false,
  renderItem,
  renderEmpty,
  renderHeader,
  renderFooter,
  renderSeparator,
  onRefresh,
  onEndReached,
  onEndReachedThreshold = 0.2,
  loadingMore,
  allLoaded,
  ...restProps
}: Omit<
  MasonryFlashListProps<T>,
  | 'ListEmptyComponent'
  | 'ListFooterComponent'
  | 'ListHeaderComponent'
  | 'onRefresh'
  | 'refreshing'
  | 'onEndReached'
  | 'onEndReachedThreshold'
> & {
  renderHeader?: () => JSX.Element | null;
  renderFooter?: () => JSX.Element | null;
  renderEmpty?: () => JSX.Element | null;
  renderSeparator?: () => JSX.Element | null;
  onRefresh?: () => void;
  onEndReached: () => void;
  refreshing?: boolean;
  onEndReachedThreshold?: number;
  loadingMore: boolean;
  allLoaded: boolean;
}) {
  // 列表数据为空的时候渲染的组件
  const ListEmptyComponent = renderEmpty?.();

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
    if (allLoaded) {
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

  return (
    <MasonryFlashList
      {...restProps}
      data={data}
      numColumns={numColumns}
      renderItem={renderItem}
      estimatedItemSize={estimatedItemSize}
      ListEmptyComponent={refreshing ? null : ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
    />
  );
}
