import { DependencyList } from 'react';

import { useMemoizedFn, useRequest, useSafeState, useUpdateEffect } from '@td-design/rn-hooks';

interface Page<T> extends PageParams {
  list: T[];
  total: number;
  totalPage?: number;
}

interface InfiniteScrollOptions<TData> {
  manual?: boolean;
  reloadDeps?: DependencyList;

  onBefore?: () => void;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
  onFinally?: (data?: TData, error?: Error) => void;
}

const INITIAL_PAGE = 1;
const INITIAL_PAGE_SIZE = 10;

export function useInfiniteScroll<T>(
  service: (data: PageParams) => Promise<Page<T>>,
  options?: InfiniteScrollOptions<Page<T>>
) {
  const { manual = false, reloadDeps = [], onBefore, onSuccess, onError, onFinally } = options || {};

  const [data, setData] = useSafeState<Page<T>>();
  const [loadingMore, setLoadingMore] = useSafeState(false);
  const [noMoreData, setNoMoreData] = useSafeState(false);

  const { loading, error, run, runAsync, cancel } = useRequest(
    async d => {
      console.log(d);
      const prevPageNo = d?.page || INITIAL_PAGE;
      const prevPageSize = d?.pageSize || INITIAL_PAGE_SIZE;

      const currentData = await service(
        d
          ? {
              page: prevPageNo + 1,
              pageSize: prevPageSize,
            }
          : {
              page: INITIAL_PAGE,
              pageSize: INITIAL_PAGE_SIZE,
            }
      );

      if (!currentData) {
        setNoMoreData(true);
      } else {
        // 后端不一定会返回pageNo和pageSize，需要根据请求参数里的pageNo和pageSize来判断
        const { page, pageSize, total, list } = currentData;

        if (page && pageSize) {
          setNoMoreData(page * pageSize >= total);
        } else {
          setNoMoreData((prevPageNo + 1) * prevPageSize >= total);
        }

        if (!d) {
          setData({
            ...currentData,
            list: [...(list || [])],
          });
        } else {
          setData({
            ...currentData,
            list: [...(d.list || []), ...(list || [])],
          });
        }
      }
      return {
        ...currentData,
        pageNo: prevPageNo + 1,
        pageSize: prevPageSize,
      } as unknown as Page<T>;
    },
    {
      manual,
      onBefore,
      onSuccess,
      onError,
      onFinally(_, d, e) {
        setLoadingMore(false);
        onFinally?.(d, e);
      },
    }
  );

  const loadMore = useMemoizedFn(() => {
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
  }, [...reloadDeps]);

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
