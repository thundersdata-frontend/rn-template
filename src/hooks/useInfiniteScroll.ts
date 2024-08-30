import { DependencyList } from 'react';

import { Toast } from '@td-design/react-native';
import { useMemoizedFn, useRequest, useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import { useAtomValue } from 'jotai';

import { permissionAtom, signedInAtom } from '@/atoms';

import { useError } from './useError';
import { useNotify } from './useNotify';

interface Page<T> extends Partial<PageParams> {
  list: T[];
  total: number;
  totalPage?: number;
}

interface InfiniteScrollOptions<TData> {
  manual?: boolean;
  ready?: boolean;
  permission?: string;
  refreshDeps?: DependencyList;

  onBefore?: () => void;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
  onFinally?: (data?: TData, error?: Error) => void;
}

const INITIAL_PAGE = 1;
const INITIAL_PAGE_SIZE = 10;

export function useInfiniteScroll<T>(
  service: (data: PageParams) => Promise<AjaxResponse<Page<T>>>,
  options?: InfiniteScrollOptions<Page<T>>
) {
  const signedIn = useAtomValue(signedInAtom);
  const permissions = useAtomValue(permissionAtom);

  const { failNotify } = useNotify();
  const { convertErrorMsg } = useError();

  const {
    manual = false, // 是否手动触发, 默认false, 即自动触发
    ready = true,
    permission,
    refreshDeps = [],
    onBefore,
    onSuccess,
    onError,
    onFinally,
  } = options || {};

  const [data, setData] = useSafeState<Page<T>>();
  const [loadingMore, setLoadingMore] = useSafeState(false);
  const [noMoreData, setNoMoreData] = useSafeState(false);

  const { loading, error, run, runAsync, cancel } = useRequest(
    async d => {
      try {
        if (permission && !permissions.includes(permission)) {
          Toast.middle({ content: '对不起，您没有操作权限' });
          return {
            page: INITIAL_PAGE,
            pageSize: INITIAL_PAGE_SIZE,
            list: [],
            total: 0,
          } as unknown as Page<T>;
        }
        if (d) {
          const { data: currentData } = await service({
            page: d.page + 1,
            pageSize: INITIAL_PAGE_SIZE,
          });

          if (!currentData) {
            setNoMoreData(true);
          } else {
            const { page, pageSize = INITIAL_PAGE_SIZE, total, list } = currentData;

            if (!page) {
              setNoMoreData((d.page + 1) * pageSize >= total);
            } else {
              setNoMoreData(page * pageSize >= total);
            }
            setData({
              page: page || d.page + 1,
              total,
              list: [...(d.list || []), ...(list || [])],
            });
          }

          return {
            page: d.page + 1,
            ...currentData,
          } as unknown as Page<T>;
        } else {
          const { data: currentData } = await service({
            page: INITIAL_PAGE,
            pageSize: INITIAL_PAGE_SIZE,
          });

          if (!currentData) {
            setNoMoreData(true);
          } else {
            const { page, pageSize = INITIAL_PAGE_SIZE, total, list } = currentData;
            if (!page) {
              setNoMoreData(INITIAL_PAGE * pageSize >= total);
            } else {
              setNoMoreData(page * pageSize >= total);
            }
            setData({
              page: page || INITIAL_PAGE,
              total,
              list: [...(list || [])],
            });
          }

          return {
            page: INITIAL_PAGE,
            ...currentData,
          } as unknown as Page<T>;
        }
      } catch (error) {
        const msg = convertErrorMsg(error);
        const result = {
          page: d ? d.page : INITIAL_PAGE,
          total: 0,
          list: [],
        };

        failNotify(msg);
        setData(result);

        return result;
      }
    },
    {
      manual,
      ready: signedIn && ready,
      onBefore,
      onSuccess,
      onError,
      onFinally(_, d, e) {
        setLoadingMore(false);
        onFinally?.(d, e);
      },
    }
  );

  console.log(loading, 'loading');

  /** 当第一次是空数据的时候， onEndReached也会被触发，所以这里一开始就会执行到。 */
  const loadMore = useMemoizedFn(() => {
    console.log('loadMore');
    if (noMoreData) return;
    setLoadingMore(true);
    return run(data);
  });

  const refresh = useMemoizedFn(() => {
    setLoadingMore(false);
    return runAsync();
  });

  useUpdateEffect(() => {
    run();
  }, [...refreshDeps]);

  return {
    data: data?.list || [],
    loading,
    loadingMore,
    noMoreData,
    error,

    loadMore,
    refresh,
    cancel,
    mutate: setData,
  };
}
