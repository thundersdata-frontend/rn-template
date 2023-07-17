import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useRequest, useSafeState } from '@td-design/rn-hooks';
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
  const { onSuccess, onError, ready, refreshDeps, ...restOptions } = options || {};

  const { failNotify } = useNotify();
  const logout = useLogout();
  const signedIn = useAtomValue(signedInAtom);

  const allLoaded = useRef(true);
  const [data, setData] = useSafeState<T[]>([]);
  const [refreshing, setRefreshing] = useSafeState(false); // 默认是true

  const {
    run,
    params = DEFAULT_PARAMS,
    loading,
  } = useRequest(service, {
    defaultParams: DEFAULT_PARAMS as P,
    ready: signedIn && ready,
    ...restOptions,
    manual: true,
    onSuccess(data: R, params: P) {
      // 对data进行处理
      const { list, page = INITIAL_PAGE, total = 0, pageSize = INITIAL_PAGE_SIZE } = data;

      const totalPage = Math.ceil(total / pageSize);
      if (totalPage === 0 || totalPage === page) {
        allLoaded.current = true;
      } else {
        allLoaded.current = false;
      }

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
      onSuccess?.(data, params);
    },
    onError(error: Error, params: P) {
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
    },
    onFinally() {
      setRefreshing(false);
    },
  });

  useEffect(() => {
    setRefreshing(true);
  }, refreshDeps);

  /**
   * 从头开始刷新数据
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    run({ ...params[0], page: INITIAL_PAGE });
  }, [params]);

  /**
   * 加载下一页数据
   */
  const onLoadMore = useCallback(() => {
    if (loading || isEmpty(params) || allLoaded.current) return;

    const { page } = params[0];
    run({ ...params[0], page: page + 1 });
  }, [loading, params]);

  const { loadingMore } = useMemo(() => {
    if (!isEmpty(params)) {
      const isFirstPage = params[0].page === INITIAL_PAGE;
      if (isFirstPage) {
        return {
          loadingMore: false,
        };
      }
      return {
        loadingMore: loading,
      };
    }
    return {
      loadingMore: false,
    };
  }, [loading, params]);

  return {
    refreshing,
    loadingMore,
    allLoaded,
    data,

    onRefresh,
    onLoadMore,
  };
}
