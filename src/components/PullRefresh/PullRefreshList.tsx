import { DataItem } from 'hooks/useRefreshService';
import { ReactElement, useRef } from 'react';
import { IndexPath, LargeList, LargeListPropType } from 'react-native-largelist';
import { LoadingFooter } from './components/LoadingFooter';
import { RefreshHeader } from './components/RefreshHeader';

export interface PullRefreshListProps<T> extends Pick<LargeListPropType, 'allLoaded' | 'renderEmpty'> {
  data: DataItem<T>[];
  renderItem: (item: T) => ReactElement;
  itemHeight: number;
  onRefresh?: () => Promise<void>;
  onLoadMore?: () => Promise<void>;
  refreshHeader?: any;
  loadingFooter?: any;
}

export function PullRefreshList<T>({
  data = [],
  itemHeight = 50,
  refreshHeader = RefreshHeader,
  loadingFooter = LoadingFooter,
  renderItem,
  renderEmpty,
  onRefresh,
  onLoadMore,
  allLoaded = false,
}: PullRefreshListProps<T>) {
  const listRef = useRef<LargeList>(null);

  const renderIndexPath = ({ section, row }: IndexPath) => {
    const item = data[section].items[row];
    return renderItem(item);
  };

  const headerRefresh = async () => {
    await onRefresh?.();
    listRef.current?.endRefresh();
  };

  const footerLoadMore = async () => {
    await onLoadMore?.();
    listRef.current?.endLoading();
  };

  return (
    <LargeList
      style={{ flex: 1 }}
      data={data}
      ref={listRef}
      heightForIndexPath={() => itemHeight}
      refreshHeader={refreshHeader}
      loadingFooter={loadingFooter}
      renderIndexPath={renderIndexPath as any}
      renderEmpty={renderEmpty}
      onRefresh={headerRefresh}
      onLoading={footerLoadMore}
      allLoaded={allLoaded}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      bounces
      dragToHideKeyboard
      updateTimeInterval={50}
    />
  );
}
