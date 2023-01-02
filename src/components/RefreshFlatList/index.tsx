import { CustomRefreshControl } from 'components/CustomRefreshControl';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

export interface RefreshFlatListProps<ItemT> extends FlatListProps<ItemT> {
  onRefresh?: () => Promise<void>;
  onEndReached?: () => Promise<void>;
}

export enum FooterStatus {
  Idle, // 初始状态，无刷新的情况
  CanLoadMore, // 可以加载更多，表示列表还有数据可以继续加载
  Refreshing, // 正在刷新中
  NoMoreData, // 没有更多数据了
  Failure, // 刷新失败
}

export interface FooterRef {
  changeStatus: (status: FooterStatus) => void;
}

function RefreshFlatList<ItemT>(props: RefreshFlatListProps<ItemT>) {
  const headerTracker = useRef(false);
  const footerRef = useRef<FooterRef>(null);
  const footerTracker = useRef<Record<number, boolean>>({});
  const footerInProgress = useRef(false);

  const onHeader = async () => {
    if (!props.onRefresh) {
      return;
    }
    headerTracker.current = true;
    await props.onRefresh();
    headerTracker.current = false;
    footerTracker.current = {};
    footerRef.current?.changeStatus(FooterStatus.Idle);
  };

  const onFooter = async () => {
    if (!props.onEndReached) {
      return;
    }
    if (headerTracker.current) {
      return;
    }
    if (footerInProgress.current) {
      return;
    }
    const length = props.data?.length || 0;
    if (footerTracker.current[length]) {
      footerRef.current?.changeStatus(FooterStatus.NoMoreData);
      return;
    }
    footerInProgress.current = true;
    footerRef.current?.changeStatus(FooterStatus.Refreshing);
    await props.onEndReached();
    footerTracker.current[length] = true;
    footerInProgress.current = false;
    footerRef.current?.changeStatus(FooterStatus.CanLoadMore);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    props.onScroll?.(event);
    const offset = event.nativeEvent.contentOffset.y;
    const visibleLength = event.nativeEvent.layoutMeasurement.height;
    const contentLength = event.nativeEvent.contentSize.height;
    const onEndReachedThreshold = props.onEndReachedThreshold || 10;
    const length = contentLength - visibleLength - offset;
    const isScrollAtEnd = length < onEndReachedThreshold;
    if (isScrollAtEnd) onFooter();
  };

  const refreshControl = props.onRefresh ? (
    <CustomRefreshControl onRefresh={onHeader} />
  ) : (
    // <CustomRefreshControl onRefresh={onHeader} />
    void 0
  );

  return (
    <FlatList
      {...props}
      onEndReached={null}
      onScroll={handleScroll}
      ListFooterComponent={() => <FooterComponent ref={footerRef} inverted={props.inverted} />}
      refreshControl={refreshControl}
      refreshing={false}
    />
  );
}

const FooterComponent = forwardRef<FooterRef, { inverted?: boolean | null }>((props, ref) => {
  const [status, setStatus] = useState(FooterStatus.Idle);

  useImperativeHandle(ref, () => ({
    changeStatus: (val: FooterStatus) => {
      setStatus(val);
    },
  }));

  const renderTemplate = () => {
    let temp = <></>;
    switch (status) {
      case FooterStatus.CanLoadMore:
        temp = (
          <View style={styles.footer}>
            <Text style={styles.text}>{props.inverted ? '下拉加载更多' : '上拉加载更多'}</Text>
          </View>
        );
        break;
      case FooterStatus.Refreshing:
        temp = (
          <View style={styles.footer}>
            <View style={styles.indicator}>
              <ActivityIndicator color={'gray'} />
            </View>
            <Text style={styles.text}>{'努力加载中...'}</Text>
          </View>
        );
        break;
      case FooterStatus.NoMoreData:
        temp = (
          <View style={styles.footer}>
            <Text style={styles.text}>{'没有更多数据了'}</Text>
          </View>
        );
        break;
      case FooterStatus.Failure:
        temp = (
          <View style={styles.footer}>
            <Text style={styles.text}>{'加载失败'}</Text>
          </View>
        );
        break;
    }
    return temp;
  };

  return renderTemplate();
});

const styles = StyleSheet.create({
  control: Platform.select<ViewStyle>({
    ios: {
      justifyContent: 'flex-end',
    },
    android: {
      flex: 1,
      overflow: 'hidden',
    },
    default: {},
  }),
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  header_left: {
    width: 32,
    height: 32,
    tintColor: 'gray',
  },
  header_right: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  header_text: {
    color: 'gray',
    fontSize: 12,
  },
  indicator: {
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    color: '#AC9FB0',
    fontSize: 14,
    marginTop: 5,
  },
});

export default RefreshFlatList;
