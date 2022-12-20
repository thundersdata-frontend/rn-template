import { FlashList, FlashListProps } from '@shopify/flash-list';

import { Container } from '../Container';
import { CustomRefreshControl } from '../CustomRefreshControl';

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
  estimatedItemSize,
  refreshing,
  renderItem,
  renderEmpty,
  renderHeader,
  renderFooter,
  onRefresh,
  ...restProps
}: Omit<
  FlashListProps<T>,
  'ListEmptyComponent' | 'ListFooterComponent' | 'ListHeaderComponent' | 'onRefresh' | 'refreshing'
> & {
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
      <FlashList
        data={data}
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
