import { LoginFailureEnum } from '@/enums';
import { useNotify } from '@/hooks/useNotify';
import { useNetInfo } from '@react-native-community/netinfo';
import { useMemoizedFn, useRequest, useSafeState } from '@td-design/rn-hooks';
import { Options, Service } from '@td-design/rn-hooks/lib/typescript/useRequest/types';
import { useMemo } from 'react';

import { storageService } from '../services/StorageService';
import createRequestService from './createRequestService';

// 初始化 page
export const INITIAL_PAGE = 1;
export const INITIAL_PAGE_SIZE = 10;

const DEFAULT_PARAMS = [
  {
    page: INITIAL_PAGE,
    pageSize: INITIAL_PAGE_SIZE,
  },
];

export type PageParams = { page: number; pageSize: number } & Record<string, unknown>;

export function useRefreshService<T, R extends Page<T> = Page<T>, P extends PageParams[] = any[]>(
  service: Service<R, P>,
  options?: Options<R, P>
) {
  const { failNotify } = useNotify();
  const { signedIn, signOut } = storageService;
  const netInfo = useNetInfo();
  console.log(netInfo);
  const isOnline = !!netInfo.isConnected && !!netInfo.isInternetReachable;
  const requestService = createRequestService(signedIn, service);

  const [data, setData] = useSafeState<T[]>([]);
  const [allLoaded, setAllLoaded] = useSafeState(false);

  const { onSuccess, onError, refreshDeps = [], ready, ...restOptions } = options || {};

  const handleError = (err: unknown, params: P) => {
    const { code, message } = JSON.parse((err as Error).message);
    if (code) {
      if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录过期, LoginFailureEnum.登录禁止].includes(code)) {
        signOut();
      }
    }
    failNotify(message);
    onError?.(err as Error, params);
  };

  const {
    runAsync,
    params = DEFAULT_PARAMS,
    data: result,
    loading,
  } = useRequest(requestService, {
    defaultParams: DEFAULT_PARAMS as P,
    refreshDeps: [isOnline, ...refreshDeps],
    ready: isOnline && ready,
    ...restOptions,
    onSuccess(data: R, params: P) {
      // 对data进行处理
      const { list, page = INITIAL_PAGE, totalPage = 0, total = 0 } = data;
      if (total === 0) {
        setData([] as T[]);
      } else if (page === INITIAL_PAGE) {
        setData(list ?? []);
      } else {
        setData(data => {
          const newData = [...data];
          return newData.concat(list ?? []);
        });
      }

      if (totalPage === 0 || totalPage === page) {
        setAllLoaded(true);
      } else {
        setAllLoaded(false);
      }

      onSuccess?.(data, params);
    },
    onError: handleError,
  });

  /**
   * 从头开始刷新数据
   */
  const onRefresh = async () => {
    try {
      await runAsync({ ...params[0], page: INITIAL_PAGE });
    } catch (error) {
      handleError(error, params as P);
    }
  };

  /**
   * 加载下一页数据
   */
  const onLoadMore = async () => {
    if (loading) return;

    try {
      const { page } = params[0];
      if (allLoaded || page >= (result?.totalPage ?? 0)) return;

      await runAsync({ ...params[0], page: page + 1 });
    } catch (error) {
      handleError(error, params as P);
    }
  };

  const onUpdate = async (params: P) => {
    if (loading) return;

    try {
      await runAsync({ ...params[0], pageSize: 10, page: INITIAL_PAGE });
    } catch (error) {
      handleError(error, params as P);
    }
  };

  const { refreshing, loadingMore } = useMemo(() => {
    if (params.length > 0) {
      const isFirstPage = params[0].page === INITIAL_PAGE;
      if (isFirstPage) {
        return {
          refreshing: loading,
          loadingMore: false,
        };
      }
      return {
        refreshing: false,
        loadingMore: loading,
      };
    }
    return {
      refreshing: loading,
      loadingMore: false,
    };
  }, [loading, params]);

  return {
    refreshing,
    loadingMore,
    allLoaded,
    data,

    onRefresh: useMemoizedFn(onRefresh),
    onLoadMore: useMemoizedFn(onLoadMore),
    onUpdate: useMemoizedFn(onUpdate),
  };
}
