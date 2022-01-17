import { useMemoizedFn, useSafeState, useRequest } from '@td-design/rn-hooks';
import { LoginFailureEnum } from 'enums';
import { useToast } from 'hooks/useToast';
import { Options, Service } from '@td-design/rn-hooks/lib/typescript/useRequest/types';
import { storageService } from '../services/StorageService';
import { useAtomValue } from 'jotai/utils';
import { isOnlineAtom } from './useNetwork';

// 初始化 page
export const INITIAL_PAGE = 1;

export type PageParams = { page: number; pageSize: number } & Record<string, unknown>;

export function useRefreshService<T, R extends Page<T> = Page<T>, P extends PageParams[] = any[]>(
  service: Service<R, P>,
  options?: Options<R, P>,
) {
  const { toastFail } = useToast();
  const { signedIn, signOut } = storageService;
  const isOnline = useAtomValue(isOnlineAtom);

  const [data, setData] = useSafeState<T[]>([]);
  const [allLoaded, setAllLoaded] = useSafeState(false);
  const [refreshing, setRefreshing] = useSafeState(false);
  const [loadingMore, setLoadingMore] = useSafeState(false);

  const promiseService = async (...args: P) => {
    if (!isOnline) {
      throw new Error(
        JSON.stringify({
          success: false,
          message: '网络连接异常',
        }),
      );
    }
    if (!signedIn) {
      throw new Error(JSON.stringify({ code: LoginFailureEnum.登录过期 }));
    }
    return service(...args);
  };

  const { onSuccess, onError, ...restOptions } = options || {};

  const handleError = (err: unknown, params: P) => {
    const { code, message } = JSON.parse((err as Error).message);
    if (code) {
      if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录过期, LoginFailureEnum.登录禁止].includes(code)) {
        signOut();
      }
    }
    toastFail(message);
    onError?.(err as Error, params);
  };

  const {
    runAsync,
    params,
    data: result,
  } = useRequest(promiseService, {
    defaultParams: [
      {
        page: INITIAL_PAGE,
        pageSize: 10,
      },
    ] as P,
    ...restOptions,
    onBefore(params: P) {
      if (params[0].page === INITIAL_PAGE) {
        setRefreshing(true);
      } else {
        setLoadingMore(true);
      }
    },
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
    onFinally(params: P) {
      if (params[0].page === INITIAL_PAGE) {
        setRefreshing(false);
      } else {
        setLoadingMore(false);
      }
    },
  });

  /**
   * 从头开始刷新数据
   */
  const onRefresh = async () => {
    try {
      await runAsync({ ...params[0], pageSize: 10, page: INITIAL_PAGE });
    } catch (error) {
      handleError(error, params as P);
    }
  };

  /**
   * 加载下一页数据
   */
  const onLoadMore = async () => {
    try {
      const { page, pageSize } = params[0];
      if (allLoaded || page >= (result?.totalPage ?? 0)) return;
      await runAsync({ ...params[0], pageSize, page: page + 1 });
    } catch (error) {
      handleError(error, params as P);
    }
  };

  const onUpdate = async (params: P) => {
    try {
      await runAsync({ ...params, pageSize: 10, page: INITIAL_PAGE });
    } catch (error) {
      handleError(error, params as P);
    }
  };

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
