import React, { forwardRef, useRef, useImperativeHandle, useCallback } from 'react';
import { Animated, ActivityIndicator, View, Text, StyleSheet, Platform, ViewStyle } from 'react-native';
import { ByronRefreshControl, RefreshControlProps } from '@byron-react-native/refresh-control';
import { useSafeState } from '@td-design/rn-hooks';

export interface CustomRefreshControlRef {
  startRefresh: () => void;
  stopRefresh: () => void;
}

export const CustomRefreshControl = forwardRef<CustomRefreshControlRef, RefreshControlProps>(
  ({ onRefresh, style, ...props }, ref) => {
    const styleHeight = (style as ViewStyle)?.height || 100;
    const [title, setTitle] = useSafeState('下拉可以刷新');
    const [lastTime, setLastTime] = useSafeState(fetchNowTime());
    const animatedValue = useRef(new Animated.Value(0));
    const [refreshing, setRefreshing] = useSafeState(false);

    useImperativeHandle(ref, () => ({
      startRefresh: () => {
        setRefreshing(true);
      },
      stopRefresh: () => {
        setRefreshing(false);
      },
    }));

    const onPullingRefresh = () => {
      Animated.timing(animatedValue.current, {
        toValue: -180,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setTitle('释放立即刷新');
      });
    };

    const onRefreshing = () => {
      setTitle('正在刷新...');
      setRefreshing(true);
      if (onRefresh) {
        onRefresh().then(() => {
          setRefreshing(false);
          setLastTime(fetchNowTime());
        });
      } else {
        setTimeout(() => {
          setRefreshing(false);
          setLastTime(fetchNowTime());
        }, 200);
      }
    };

    const onIdleRefresh = () => {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setTitle('下拉可以刷新');
        setRefreshing(false);
      });
    };

    const onRefreshFinished = () => {};

    const onChangeState = useCallback(state => {
      props.onChangeState?.(state);
      switch (state) {
        case 1: // 可以下拉
          onIdleRefresh();
          break;
        case 2: // 正在下拉
          onPullingRefresh();
          break;
        case 3: // 正在刷新
          onRefreshing();
          break;
        case 4: // 刷新完成
          onRefreshFinished();
          break;
        default:
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rotate = animatedValue.current.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    const NormalRefreshHeader = (
      <View style={styles.row}>
        {refreshing ? (
          <ActivityIndicator color={'gray'} />
        ) : (
          <Animated.Image style={[styles.left, { transform: [{ rotate }] }]} source={require('./assets/arrow.png')} />
        )}
        <View style={styles.right}>
          <Text style={styles.text}>{title}</Text>
          <Text style={[styles.text, { marginTop: 5, fontSize: 11 }]}>{`上次更新：${lastTime}`}</Text>
        </View>
      </View>
    );
    return (
      <ByronRefreshControl
        refreshing={refreshing}
        onChangeState={onChangeState}
        style={[style || styles.control, Platform.OS === 'ios' ? { height: styleHeight, marginTop: -styleHeight } : {}]}
      >
        {props.children ? props.children : NormalRefreshHeader}
      </ByronRefreshControl>
    );
  },
);

const fetchNowTime = () => {
  const date = new Date();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const MM = M < 10 ? '0' + M : M;
  const DD = D < 10 ? '0' + D : D;
  const hh = h < 10 ? '0' + h : h;
  const mm = m < 10 ? '0' + m : m;
  return `${MM}-${DD} ${hh}:${mm}`;
};

const styles = StyleSheet.create({
  control: Platform.select({
    ios: {
      backgroundColor: '#fff',
      justifyContent: 'flex-end',
    },
    android: {
      flex: 1,
      overflow: 'hidden',
    },
  }) as ViewStyle,
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  left: {
    width: 32,
    height: 32,
    tintColor: 'gray',
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  text: {
    color: 'gray',
    fontSize: 12,
  },
  indicator: {
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
