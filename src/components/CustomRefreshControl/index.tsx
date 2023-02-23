import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { RefreshControlProps, RNRefreshControl, RNRefreshHeader } from '@byron-react-native/refresh-control';
import { useTheme } from '@shopify/restyle';
import { useSafeState } from '@td-design/rn-hooks';

import { AppTheme } from '@/theme';

export interface CustomRefreshControlRef {
  startRefresh: () => void;
  stopRefresh: () => void;
}

const DEFAULT_HEIGHT = 64;
export const CustomRefreshControl = forwardRef<CustomRefreshControlRef, RefreshControlProps>(
  ({ onRefresh, style, ...props }, ref) => {
    const theme = useTheme<AppTheme>();

    const [height, setHeight] = useState(DEFAULT_HEIGHT);
    const [title, setTitle] = useSafeState('下拉进行刷新');
    const [lastTime, setLastTime] = useSafeState(fetchNowTime());
    const animatedValue = useRef(new Animated.Value(0));
    const [refreshing, setRefreshing] = useSafeState(props.refreshing ?? false);

    useEffect(() => {
      setRefreshing(props.refreshing ?? false);
    }, [props.refreshing]);

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
        setTitle('下拉进行刷新');
        setRefreshing(false);
      });
    };

    const onRefreshFinished = () => {};

    const onChangeState = (state: number) => {
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
    };

    const rotate = animatedValue.current.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    const onLayout = (event: LayoutChangeEvent) => {
      const layout = event.nativeEvent.layout;
      if (layout.height !== height) {
        setHeight(Math.ceil(layout.height));
      }
    };

    return (
      <RNRefreshControl
        refreshing={refreshing}
        onChangeState={onChangeState}
        style={[style || styles.control, Platform.OS === 'ios' ? { marginTop: -height } : {}]}
        height={height}
      >
        <RNRefreshHeader style={styles.row} onLayout={onLayout}>
          {refreshing ? (
            <ActivityIndicator color={'gray'} />
          ) : (
            <Animated.Image
              style={[styles.left, { tintColor: theme.colors.black, transform: [{ rotate }] }]}
              source={require('./assets/arrow.png')}
            />
          )}
          <View style={styles.right}>
            <Text style={{ fontSize: 12, color: theme.colors.black }}>{title}</Text>
            <Text style={{ marginTop: 5, fontSize: 10, color: theme.colors.black }}>{`上次更新：${lastTime}`}</Text>
          </View>
        </RNRefreshHeader>
        {/* {props.children} 不能删除或注释，会导致 Android 无法设置 RefreshContent */}
        {props.children}
      </RNRefreshControl>
    );
  }
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
    paddingVertical: 20,
  },
  left: {
    width: 32,
    height: 32,
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  indicator: {
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
