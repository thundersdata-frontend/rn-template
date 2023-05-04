import { ActivityIndicator, View } from 'react-native';

import { RefreshControl } from '@sdcx/pull-to-refresh';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { Flex, Text } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';

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
  renderSeparator,
  onRefresh,
  onEndReached,
  onEndReachedThreshold = 0.2,
  loadingMore,
  allLoaded,
  ...restProps
}: Omit<
  FlashListProps<T>,
  | 'ListEmptyComponent'
  | 'ListFooterComponent'
  | 'ListHeaderComponent'
  | 'onRefresh'
  | 'refreshing'
  | 'onEndReached'
  | 'onEndReachedThreshold'
  | 'estimatedItemSize'
> & {
  renderHeader?: () => JSX.Element | null;
  renderFooter?: () => JSX.Element | null;
  renderEmpty?: (height: number) => JSX.Element | null;
  renderSeparator?: () => JSX.Element | null;
  onRefresh?: () => Promise<void>;
  onEndReached: () => Promise<void>;
  refreshing: boolean;
  onEndReachedThreshold?: number;
  estimatedItemSize: number;
  loadingMore: boolean;
  allLoaded: boolean;
}) {
  const [height, setHeight] = useSafeState(0);

  // 列表数据为空的时候渲染的组件
  const ListEmptyComponent = renderEmpty?.(height);

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
    <View style={{ flex: 1 }} onLayout={event => setHeight(event.nativeEvent.layout.height)}>
      <FlashList
        {...restProps}
        data={data}
        renderItem={renderItem}
        estimatedItemSize={estimatedItemSize}
        ListEmptyComponent={refreshing ? null : ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}
