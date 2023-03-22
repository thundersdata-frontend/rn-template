import { useRef } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

import { FlashList, FlashListProps } from '@shopify/flash-list';
import { Flex, Text } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';

import { CustomRefreshControl } from '../CustomRefreshControl';

export enum FooterStatus {
  Idle, // 初始状态，无刷新的情况
  CanLoadMore, // 可以加载更多，表示列表还有数据可以继续加载
  Refreshing, // 正在刷新中
  NoMoreData, // 没有更多数据了
  Failure, // 刷新失败
}

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
  onEndReached,
  onEndReachedThreshold,
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
  renderFooter?: (footerStatus: FooterStatus) => JSX.Element | null;
  renderEmpty?: (height: number) => JSX.Element | null;
  onRefresh?: () => Promise<void>;
  onEndReached: () => Promise<void>;
  refreshing: boolean;
  onEndReachedThreshold: number;
  estimatedItemSize: number;
  loadingMore: boolean;
  allLoaded: boolean;
}) {
  const headerTracker = useRef(false);
  const [footerStatus, setFooterStatus] = useSafeState(FooterStatus.Idle);
  const [height, setHeight] = useSafeState(0);

  const onHeader = async () => {
    headerTracker.current = true;
    await onRefresh!();
    headerTracker.current = false;
    setFooterStatus(FooterStatus.Idle);
  };

  const onFooter = async () => {
    if (!onEndReached) {
      return;
    }
    if (headerTracker.current) {
      return;
    }
    if (loadingMore) {
      return;
    }
    if (allLoaded) {
      setFooterStatus(FooterStatus.NoMoreData);
      return;
    }
    setFooterStatus(FooterStatus.Refreshing);
    try {
      await onEndReached();
    } catch (error) {
      setFooterStatus(FooterStatus.CanLoadMore);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    restProps.onScroll?.(event);
    const offset = event.nativeEvent.contentOffset.y;
    const visibleLength = event.nativeEvent.layoutMeasurement.height;
    const contentLength = event.nativeEvent.contentSize.height;
    const length = contentLength - visibleLength - offset;
    const isScrollAtEnd = length < onEndReachedThreshold;
    if (isScrollAtEnd) onFooter();
  };

  const refreshControl = onRefresh ? <CustomRefreshControl onRefresh={onHeader} refreshing={refreshing} /> : void 0;

  // 列表数据为空的时候渲染的组件
  const ListEmptyComponent = renderEmpty?.(height);
  // 列表顶部组件
  const ListHeaderComponent = renderHeader?.();
  // 列表底部组件
  const ListFooterComponent = () => {
    if (refreshing) return null;
    if (renderFooter) return renderFooter(footerStatus);

    switch (footerStatus) {
      case FooterStatus.CanLoadMore:
        return (
          <Flex marginVertical={'x3'} alignItems={'center'} justifyContent={'center'}>
            <Text variant="p1" color="gray400">
              上拉加载更多
            </Text>
          </Flex>
        );
      case FooterStatus.Refreshing:
        return (
          <Flex marginVertical={'x3'} alignItems={'center'} justifyContent={'center'}>
            <ActivityIndicator color="gray" />
            <Text variant="p1" color="gray400">
              努力加载中...
            </Text>
          </Flex>
        );
      case FooterStatus.NoMoreData:
        return (
          <Flex marginVertical={'x3'} alignItems={'center'} justifyContent={'center'}>
            <Text variant="p1" color="gray400">
              没有更多数据了
            </Text>
          </Flex>
        );
      case FooterStatus.Failure:
        return (
          <Flex marginVertical={'x3'} alignItems={'center'} justifyContent={'center'}>
            <Text variant="p1" color="gray400">
              加载失败
            </Text>
          </Flex>
        );
      default:
        return null;
    }
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
        refreshControl={refreshControl}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onEndReached={null}
      />
    </View>
  );
}
