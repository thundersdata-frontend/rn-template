import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { IconOutline } from '@ant-design/icons-react-native';
import { StackHeaderProps, StackHeaderLeftButtonProps, StackNavigationOptions, Header } from '@react-navigation/stack';
import { extend, ExtendOptionsInit } from 'umi-request';
import { Size, Color } from './config';
import TitleBar from './components/TitleBar';

export const PAGE = 1;
export const PAGE_SIZE = 10;
export const TOTAL = 0;

export const initialFetchChartData = {
  xAxis: [],
  yAxis: [],
  series: []
};

export const initialPagination = {
  list: [],
  page: 0,
  pageSize: 10,
  total: 0
};

export const commonStackOptions: StackNavigationOptions = {
  header: (props: StackHeaderProps) => (
    <View style={{ backgroundColor: Color.white }}>
      <Header {...props} />
    </View>
  ),
  headerTitleStyle: {
    fontWeight: '500',
    color: Color.mainTextColor,
    fontSize: Size.px(18)
  },
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerLeft: (props: StackHeaderLeftButtonProps) =>
    props.canGoBack && (
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={{ marginLeft: 0, padding: 10 }}>
        <IconOutline name="left" size={24} color={Color.primary} />
      </TouchableOpacity>
    )
};

export const linearGradientStackOptions: StackNavigationOptions = {
  header: (props: StackHeaderProps) => <TitleBar {...props} />,
  headerTitleStyle: {
    fontWeight: '500',
    color: Color.white,
    fontSize: Size.px(18)
  },
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerLeft: (props: StackHeaderLeftButtonProps) =>
    props.canGoBack && (
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={{ marginLeft: 0, padding: 10 }}>
        <IconOutline name="left" size={24} color={Color.white} />
      </TouchableOpacity>
    )
};

export enum FETCH_ERROR {
  EXPIRED = '1',
  FAILED = '2',
  VPN_ERROR = '3'
}

/** 这边可对接口请求做一些统一的封装 */
export const commonRequestOptions: ExtendOptionsInit = {
  useCache: false,
  ttl: 60000
};
export const request = extend(commonRequestOptions);

const toastSettings = {
  duration: 1000,
  position: Toast.positions.CENTER,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  textColor: Color.white
};

export function toastSuccess(message: string) {
  Toast.show(message, {
    ...toastSettings,
    backgroundColor: Color.success
  });
}
export function toastWarning(message: string) {
  Toast.show(message, {
    ...toastSettings,
    backgroundColor: Color.warning
  });
}
export function toastFail(message: string) {
  Toast.show(message, {
    ...toastSettings,
    backgroundColor: Color.fail
  });
}
