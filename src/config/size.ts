/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-09-25 22:23:51
 * @LastEditors: 廖军
 * @LastEditTime: 2019-10-17 15:33:00
 */
import { Dimensions, Platform, StyleSheet } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? (isIphoneX() ? 34 : 20) : 0;

const uiPageWidth = 375;

const px = (uiPx: number) => {
  if (uiPx <= 10) return uiPx;
  return (uiPx * DEVICE_WIDTH) / uiPageWidth;
};

// iPhone X、iPhone XS
const X_WIDTH = 375;
const X_HEIGHT = 812;

const matchXSize =
  (DEVICE_HEIGHT === X_HEIGHT && DEVICE_WIDTH === X_WIDTH) || (DEVICE_HEIGHT === X_WIDTH && DEVICE_WIDTH === X_HEIGHT);

// iPhone XR、iPhone XS Max
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const matchXSMaxSize =
  (DEVICE_HEIGHT === XSMAX_HEIGHT && DEVICE_WIDTH === XSMAX_WIDTH) ||
  (DEVICE_HEIGHT === XSMAX_WIDTH && DEVICE_WIDTH === XSMAX_HEIGHT);

export function isIOS() {
  return Platform.OS === 'ios';
}

export function isIphoneX() {
  return (isIOS() && matchXSize) || matchXSMaxSize;
}

export default {
  px,
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  STATUSBAR_HEIGHT,
  // ONE_PIXEL: 1 / PixelRatio.get(),
  ONE_PIXEL: StyleSheet.hairlineWidth,
};
