import { DefaultError, MutationFunction, useMutation, UseMutationOptions } from '@tanstack/react-query';

import { useNotify } from './useNotify';

/**
 * 在请求是post/put/delete时，使用此方法
 * @param mutateFn
 * @param options
 * @returns
 */
export function useCustomMutate<T, TData = T, TError = DefaultError, TVariables = void, TContext = unknown>(
  mutateFn: MutationFunction<TData, TVariables>,
  {
    onBefore,
    onSuccess,
    onError,
    throwOnError = false,
    onFinally,
    ...options
  }: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > & {
    onBefore?: (variables: TVariables) => Promise<TContext | undefined> | TContext | undefined;
    onSuccess?: (data?: TData, variables?: TVariables, context?: TContext) => void;
    onError?: (error: TError) => void;
    throwOnError?: boolean;
    onFinally?: (data?: TData, error?: TError | null) => void;
  }
) {
  const { failNotify } = useNotify();

  const mutate = useMutation({
    ...options,
    mutationFn: mutateFn,
    onMutate: onBefore,
    onSuccess,
    onError: error => {
      if (!throwOnError) {
        failNotify((error as Error).message || '请求失败');
      } else {
        onError?.(error);
      }
    },
    onSettled: (data, error) => {
      onFinally?.(data, error);
    },
  });

  return mutate;
}
