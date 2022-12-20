import { MasonryFlashList, MasonryFlashListProps } from '@shopify/flash-list';

import { Container } from '../Container';
import { CustomRefreshControl } from '../CustomRefreshControl';

/**
 * 瀑布流列表（每个item的高度可能都不一样，多用于feed流）。

 */
export function WaterfallList<T>({
  data,
  numColumns,
  estimatedItemSize,
  refreshing,
  renderItem,
  renderEmpty,
  renderHeader,
  renderFooter,
  onRefresh,
  ...restProps
}: MasonryFlashListProps<T> & {
  renderHeader?: () => JSX.Element | null;
  renderFooter?: () => JSX.Element | null;
  renderEmpty?: () => JSX.Element | null;
  onRefresh?: () => Promise<void>;
  refreshing?: boolean;
}) {
  // 列表数据为空的时候渲染的组件
  const ListEmptyComponent = renderEmpty?.();
  // 列表顶部组件
  const ListHeaderComponent = renderHeader?.();
  // 列表底部组件
  const ListFooterComponent = renderFooter?.();

  return (
    <Container>
      <MasonryFlashList
        data={data}
        numColumns={numColumns}
        renderItem={renderItem}
        estimatedItemSize={estimatedItemSize}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        refreshControl={<CustomRefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
        {...restProps}
      />
    </Container>
  );
}
