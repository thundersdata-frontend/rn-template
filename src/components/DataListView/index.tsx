import { Empty, helpers } from '@td-design/react-native';
import { ForwardedRef, forwardRef, ReactText } from 'react';
import { ScrollView } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider, RecyclerListViewProps } from 'recyclerlistview';

export interface DataListViewProps<T>
  extends Partial<
    Pick<
      RecyclerListViewProps,
      | 'rowRenderer'
      | 'renderFooter'
      | 'onEndReached'
      | 'onEndReachedThreshold'
      | 'scrollViewProps'
      | 'onScroll'
      | 'renderAheadOffset'
    >
  > {
  data: T[];
  itemHeight: number;
  keyExtractor: (item: T) => string;
  renderItem?: (item: T) => JSX.Element;
  renderLayoutProvider?: (data: DataProvider) => LayoutProvider;
}

const ViewTypes = 'FULL';

function DataListViewInner<T = Record<string, unknown>, R = any>(
  {
    data,
    itemHeight,
    keyExtractor,
    renderItem,
    renderFooter,
    onEndReached,
    onEndReachedThreshold = 20,
    scrollViewProps,
    onScroll,
    renderAheadOffset = helpers.deviceHeight,
    ...props
  }: DataListViewProps<T>,
  ref: ForwardedRef<R>,
) {
  const dataProvider = new DataProvider((r1: any, r2: any) => {
    const key1 = keyExtractor(r1);
    const key2 = keyExtractor(r2);
    return key1 !== key2;
  });
  const listData = dataProvider.cloneWithRows(data);

  const layoutProvider =
    props.renderLayoutProvider?.(listData) ??
    new LayoutProvider(
      () => ViewTypes,
      (type, dim) => {
        switch (type) {
          case ViewTypes:
            dim.width = helpers.deviceWidth;
            dim.height = itemHeight;
            break;

          default:
            dim.width = 0;
            dim.height = 0;
        }
      },
    );

  const rowRenderer = props.rowRenderer
    ? props.rowRenderer
    : (type: ReactText, data: any) => {
        switch (type) {
          case ViewTypes:
            if (!renderItem) return null;
            return renderItem?.(data);
          default:
            return null;
        }
      };

  if (data.length === 0) {
    return (
      <ScrollView ref={ref as any}>
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
      onScroll={onScroll}
      scrollViewProps={scrollViewProps}
      scrollThrottle={16}
      // https://github.com/Flipkart/recyclerlistview/tree/master/docs/guides/performance
      renderAheadOffset={renderAheadOffset}
      optimizeForInsertDeleteAnimations
    />
  );
}

/** 通过类型断言，解决forwardRef不支持泛型的问题 */
export const DataListView = forwardRef(DataListViewInner) as <T, R>(
  props: DataListViewProps<T> & { ref?: React.ForwardedRef<R> },
) => ReturnType<typeof DataListViewInner>;
