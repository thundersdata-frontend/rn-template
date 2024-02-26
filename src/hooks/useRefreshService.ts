import { useEffect } from 'react';

import {
  DefaultError,
  InfiniteData,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useNotify } from './useNotify';

// 初始化 page
export const INITIAL_PAGE = 1;
export const INITIAL_PAGE_SIZE = 10;

/**
 * 专门给滚动加载的列表使用的hook
 * @param queryFn
 * @param param1
 * @returns
 */
export function useRefreshService<T, TError = DefaultError, TQueryKey extends QueryKey = QueryKey>(
  queryFn: (params: PageParams & Obj) => Promise<Page<T>>,
  {
    throwOnError = false,
    onError,
    ...options
  }: Omit<
    UndefinedInitialDataInfiniteOptions<Page<T>, TError, InfiniteData<Page<T>, number>, TQueryKey, number>,
    'queryFn' | 'getNextPageParam' | 'initialPageParam' | 'queryKey' | 'queryFn'
  > & {
    queryKey: QueryKey;
    throwOnError?: boolean;
    onError?: (error: TError) => void;
  }
) {
  const { failNotify } = useNotify();
  const queryClient = useQueryClient();

  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage, refetch, isError, error } =
    useInfiniteQuery({
      ...options,
      queryKey: options.queryKey as unknown as TQueryKey,
      queryFn: ({ pageParam, queryKey }) => {
        const [, params] = queryKey; // 第一个元素是cacheKey，第二个元素是请求参数, 例如：['/api/user', { name: '张三' }]
        if (params && typeof params === 'object')
          return queryFn({ ...params, page: pageParam || INITIAL_PAGE, pageSize: INITIAL_PAGE_SIZE });

        return queryFn({ page: pageParam || INITIAL_PAGE, pageSize: INITIAL_PAGE_SIZE });
      },
      /**
       * 如果最后一次请求返回的数据的总数大于等于总条数，说明没有更多数据了，返回undefined，否则返回下一页的页码
       * @param lastData 表示最后一次请求返回的数据
       * @returns
       */
      getNextPageParam: lastData => {
        if (lastData.page * lastData.pageSize < lastData.total) return lastData.page + 1;
        return undefined;
      },
      // 初始值
      initialPageParam: INITIAL_PAGE,
    });

  useEffect(() => {
    if (isError) {
      if (!throwOnError) {
        failNotify((error as Error).message || '请求失败');
      } else {
        onError?.(error as TError);
      }
    }
  }, [isError, error, onError, throwOnError]);

  const flattenData = data?.pages.flatMap(page => page.list) || [];

  const refresh = () => {
    queryClient.setQueryData<InfiniteData<Page<T>, number>>(options.queryKey, prev => {
      if (!prev) return prev;

      return {
        pages: prev.pages.slice(0, 1),
        pageParams: prev.pageParams.slice(0, 1),
      };
    });
    return refetch();
  };

  return {
    data: flattenData,
    loading: isFetching,
    noMoreData: !hasNextPage,
    loadMore: fetchNextPage,
    loadingMore: isFetchingNextPage,
    refresh,
  };
}
