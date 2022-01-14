import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { useMount, useUpdateEffect } from '@td-design/rn-hooks';
import { atom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';

/** 是否联网 */
export const isOnlineAtom = atom(true);

export function useNetwork() {
  const updateOnlineAtom = useUpdateAtom(isOnlineAtom);

  /** 已经包含了网络连接变化情况的监听事件 */
  const netInfo = useNetInfo({
    reachabilityUrl: 'http://authorization.dev.thundersdata.com/v2/api-docs',
    reachabilityTest: async response => response.status === 200,
    reachabilityLongTimeout: 30 * 1000, // 60s
    reachabilityShortTimeout: 3 * 1000, // 5s
    reachabilityRequestTimeout: 6 * 1000, // 15s
    reachabilityShouldRun: () => true,
  });

  /**
   * 当连接状态发生改变的时候
   */
  useUpdateEffect(() => {
    updateOnlineAtom(!!netInfo.isConnected && !!netInfo?.isInternetReachable);
  }, [netInfo.isConnected, netInfo.isInternetReachable]);

  /**
   * 一上来就先获取网络连接状态
   */
  useMount(() => {
    NetInfo.fetch().then(state => {
      updateOnlineAtom(!!state.isConnected && !!state?.isInternetReachable);
    });
  });
}
