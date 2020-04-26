/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-20 16:14:24
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-26 16:35:52
 */
import NetInfo from '@react-native-community/netinfo';
import { toastFail } from '../common';

/**
 * 联网检查
 */
export const checkNet = async () => {
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    toastFail('设备未连接网络');
  }
};
