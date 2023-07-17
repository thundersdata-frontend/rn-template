import { useMemo } from 'react';

import { useMemoizedFn, useRequest, useSafeState } from '@td-design/rn-hooks';
import { Options, Service } from '@td-design/rn-hooks/lib/typescript/useRequest/types';
import { useAtomValue } from 'jotai';
import { isEmpty } from 'lodash-es';

import { signedInAtom } from '@/atoms';
import { LoginFailureEnum } from '@/enums';
import { useNotify } from '@/hooks/useNotify';

import useLogout from './useLogout';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRefreshService<T, R extends Page<T> = Page<T>, P extends PageParams[] = any[]>(
  service: Service<R, P>,
  options?: Options<R, P>
) {
  const { failNotify } = useNotify();
  const logout = useLogout();
  const signedIn = useAtomValue(signedInAtom);

  const [data, setData] = useSafeState<T[]>([]);
  const [allLoaded, setAllLoaded] = useSafeState(true);

  const { onSuccess, onError, ready, ...restOptions } = options || {};

  const handleError = (error: Error, params: P) => {
    try {
      const { code, message } = JSON.parse(error.message);
      if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录禁止].includes(code)) {
        failNotify(message);
        logout();
      } else {
        failNotify(message);
      }
    } catch (err) {
      failNotify((err as { message: string })?.message);
    } finally {
      onError?.(error, params);
    }
  };

  const {
    run,
    params = DEFAULT_PARAMS,
    loading,
  } = useRequest(service, {
    defaultParams: DEFAULT_PARAMS as P,
    ready: signedIn && ready,
    ...restOptions,
    onSuccess(data: R, params: P) {
      // 对data进行处理
      const { list, page = INITIAL_PAGE, total = 0, pageSize = INITIAL_PAGE_SIZE } = data;
      const totalPage = Math.ceil(total / pageSize);

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
  const onRefresh = () => {
    console.log('123');
    run({ ...params[0], page: INITIAL_PAGE });
  };

  /**
   * 加载下一页数据
   */
  const onLoadMore = () => {
    if (loading || isEmpty(params)) return;

    const { page } = params[0];
    if (allLoaded) return;

    run({ ...params[0], page: page + 1 });
  };

  const onUpdate = () => {
    if (loading) return;
    run({ pageSize: INITIAL_PAGE_SIZE, page: INITIAL_PAGE });
  };

  const { refreshing, loadingMore } = useMemo(() => {
    if (!isEmpty(params)) {
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
