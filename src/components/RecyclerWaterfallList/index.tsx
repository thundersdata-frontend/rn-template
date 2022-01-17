import { Empty, helpers } from '@td-design/react-native';
import { ForwardedRef, forwardRef, ReactText } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import {
  MasonryLayoutProvider,
  RecyclerListView,
  DataProvider,
  RecyclerListViewProps,
  Dimension,
  Layout,
} from 'recyclerlistview-masonrylayoutmanager';

export interface RecyclerListViewRef<T> {
  scrollToIndex(index: number, animate?: boolean): void;
  scrollToItem(data: T, animate?: boolean): void;
  getLayout(index: number): Layout | undefined;
  scrollToTop(animate?: boolean): void;
  scrollToEnd(animate?: boolean): void;
  scrollToOffset: (x: number, y: number, animate?: boolean) => void;
  updateRenderAheadOffset(renderAheadOffset: number): boolean;
  getCurrentRenderAheadOffset(): number;
  getCurrentScrollOffset(): number;
  findApproxFirstVisibleIndex(): number;
  getRenderedSize(): Dimension;
  getContentDimension(): Dimension;
  forceRerender(): void;
  renderCompat(): JSX.Element;
}
export interface RenderItemInfo<T> {
  type: ReactText;
  item: T;
  index: number;
}
export interface RecyclerFlatListProps<T>
  extends Partial<
    Pick<
      RecyclerListViewProps,
      | 'renderFooter'
      | 'onEndReached'
      | 'onEndReachedThreshold'
      | 'onScroll'
      | 'renderAheadOffset'
      | 'initialOffset'
      | 'initialRenderIndex'
    >
  > {
  data: T[];
  numColumns?: number;
  keyExtractor: (item: T) => string;
  renderHeader?: () => JSX.Element;
  renderItem: (info: RenderItemInfo<T>) => JSX.Element;
  scrollViewProps?: ScrollViewProps;
}

const { deviceWidth } = helpers;
function RecyclerWaterfallListInner<
  T extends { isCrossRow?: boolean } & Record<string, unknown>,
  R = RecyclerListViewRef<T>,
>(
  {
    data,
    keyExtractor,
    renderItem,
    renderFooter,
    onEndReached,
    onEndReachedThreshold = 20,
    initialOffset,
    initialRenderIndex,
    scrollViewProps,
    onScroll,
    renderAheadOffset = helpers.deviceHeight,
    numColumns = 2,
  }: RecyclerFlatListProps<T>,
  ref: ForwardedRef<R>,
) {
  /**
   * RLV 需要的DataProvider
   */
  const dataProvider = new DataProvider((r1: T, r2: T) => {
    const key1 = keyExtractor(r1);
    const key2 = keyExtractor(r2);
    return key1 !== key2;
  });
  const listData = dataProvider.cloneWithRows(data);

  /**
   * RLV 需要的LayoutProvider
   */
  const layoutProvider = new MasonryLayoutProvider(
    numColumns,
    () => {
      return 'VSEL'; //Since we have just one view type
    },
    (_, dim, index) => {
      const columnWidth = deviceWidth / numColumns;
      const item = listData.getDataForIndex(index);
      dim.width = columnWidth;
      dim.height = item.height;
    },
  );

  /**
   * RLV 需要的RowRenderer
   */
  const rowRenderer = (type: ReactText, item: T, index: number) => {
    return renderItem({ type, item, index });
  };

  if (data.length === 0) {
    return (
      <ScrollView ref={ref as ForwardedRef<ScrollView>}>
        <Empty />
      </ScrollView>
    );
  }

  return (
    <RecyclerListView
      ref={ref as any}
      dataProvider={listData}
      layoutProvider={layoutProvider}
      rowRenderer={rowRenderer}
      renderFooter={renderFooter}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      canChangeSize
      initialOffset={initialOffset}
      onScroll={onScroll}
      scrollViewProps={{
        ...scrollViewProps,
      }}
      {...(initialRenderIndex && !!data.length ? { initialRenderIndex } : {})}
      scrollThrottle={16}
      // https://github.com/Flipkart/recyclerlistview/tree/master/docs/guides/performance
      renderAheadOffset={renderAheadOffset}
      optimizeForInsertDeleteAnimations
    />
  );
}

/** 通过类型断言，解决forwardRef不支持泛型的问题 */
export const RecyclerWaterfallList = forwardRef(RecyclerWaterfallListInner) as <T, R = RecyclerListViewRef<T>>(
  props: RecyclerFlatListProps<T> & { ref?: React.ForwardedRef<R> },
) => ReturnType<typeof RecyclerWaterfallListInner>;
