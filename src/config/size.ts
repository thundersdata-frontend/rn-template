/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-09-25 22:23:51
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-16 17:02:17
 */
import { Dimensions, Platform, StyleSheet } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const uiPageWidth = 375;

const px = (uiPx: number) => {
  if (uiPx <= 10) return uiPx;
  return (uiPx * DEVICE_WIDTH) / uiPageWidth;
};

export function isIOS() {
  return Platform.OS === 'ios';
}

/**得到默认的header高度 */
// eslint-disable-next-line complexity
export const getDefaultHeaderHeight = (): number => {
  const isLandscape = DEVICE_WIDTH > DEVICE_HEIGHT;

  let headerHeight = 0;

  if (Platform.OS === 'ios') {
    if (isLandscape && !Platform.isPad) {
      headerHeight += 32;
    } else {
      headerHeight += 56;
    }
  }
  if (Platform.OS === 'android') {
    headerHeight += 56;
  }

  return headerHeight;
};

/**IOS异形屏notch高度 */
export const iosNotchHeight = () => {
  return 32;
};

/**安卓异形屏的notch高度 */
export const androidNotchHeight = () => {
  return 32;
};

export default {
  px,
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  ONE_PIXEL: StyleSheet.hairlineWidth
};
