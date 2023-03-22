import { useRef } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { MasonryFlashList, MasonryFlashListProps } from '@shopify/flash-list';
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
  onEndReached,
  onEndReachedThreshold,
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
  renderFooter?: (footerStatus: FooterStatus) => JSX.Element | null;
  renderEmpty?: () => JSX.Element | null;
  onRefresh?: () => Promise<void>;
  onEndReached: () => Promise<void>;
  refreshing?: boolean;
  onEndReachedThreshold: number;
  loadingMore: boolean;
  allLoaded: boolean;
}) {
  const headerTracker = useRef(false);
  const [footerStatus, setFooterStatus] = useSafeState(FooterStatus.Idle);

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
  const ListEmptyComponent = renderEmpty?.();
  // 列表顶部组件
  const ListHeaderComponent = renderHeader?.();
  // 列表底部组件
  const ListFooterComponent = () => {
    if (refreshing) return null;
    if (renderFooter) return renderFooter(footerStatus);

    switch (footerStatus) {
      case FooterStatus.CanLoadMore:
        return (
          <Flex marginTop={'x5'} alignItems={'center'} justifyContent={'center'}>
            <Text variant="p1" color="gray400">
              上拉加载更多
            </Text>
          </Flex>
        );
      case FooterStatus.Refreshing:
        return (
          <Flex marginTop={'x5'} alignItems={'center'} justifyContent={'center'}>
            <ActivityIndicator color="gray" />
            <Text variant="p1" color="gray400">
              努力加载中...
            </Text>
          </Flex>
        );
      case FooterStatus.NoMoreData:
        return (
          <Flex marginTop={'x5'} alignItems={'center'} justifyContent={'center'}>
            <Text variant="p1" color="gray400">
              没有更多数据了
            </Text>
          </Flex>
        );
      case FooterStatus.Failure:
        return (
          <Flex marginTop={'x5'} alignItems={'center'} justifyContent={'center'}>
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
    <MasonryFlashList
      {...restProps}
      data={data}
      numColumns={numColumns}
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
  );
}
