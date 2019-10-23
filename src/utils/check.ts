import NetInfo from '@react-native-community/netinfo';
import { toastFail } from '../stores/common';

/**
 * 联网检查
 */
export const checkNet = async () => {
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    toastFail('设备未联网，请检查');
  }
};
