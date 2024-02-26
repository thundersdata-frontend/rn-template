import { useEffect } from 'react';

import { DefaultError, UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { useError } from './useError';
import { useNotify } from './useNotify';

type Service<R, P> = (params: P) => Promise<R>;

/**
 * 请求是get时，使用此方法。注意，如果是post/put/delete请求，请使用useCustomMutate
 * @param queryFn
 * @param param1
 * @returns
 */
export function useCustomQuery<T, P, TError = DefaultError, TData = T, TQueryKey extends QueryKey = QueryKey>(
  queryFn: Service<T, P>,
  {
    queryKey,
    onSuccess,
    onError,
    throwOnError = false,
    ...options
  }: Omit<UndefinedInitialDataOptions<T, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'> & {
    queryKey: TQueryKey;
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
    throwOnError?: boolean;
  }
) {
  const { convertErrorMsg } = useError();
  const { failNotify } = useNotify();

  const result = useQuery({
    ...options,
    queryKey,
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey; // 第一个元素是cacheKey，第二个元素是请求参数, 例如：['/api/user', { name: '张三' }]
      if (params && typeof params === 'object') return queryFn(params as P);

      return queryFn(undefined as unknown as P);
    },
  });

  const { isError, error, isSuccess, data, isFetching, ...rest } = result;

  /** 触发onError回调 */
  useEffect(() => {
    if (isError) {
      if (!throwOnError) {
        failNotify(convertErrorMsg(error) || '请求失败');
      } else {
        onError?.(error as TError);
      }
    }
  }, [isError, error, onError, throwOnError]);

  /** 触发onSuccess回调 */
  useEffect(() => {
    if (isSuccess && onSuccess && data) {
      onSuccess(data);
    }
  }, [isSuccess, data]);

  return {
    ...rest,
    loading: isFetching,
    data,
  };
}
