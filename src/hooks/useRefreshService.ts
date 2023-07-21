import { Options, Service } from '@td-design/rn-hooks/lib/typescript/useRequest/types';

import { useCustomRequest } from './useCustomRequest';

// 初始化 page
export const INITIAL_PAGE = 1;
export const INITIAL_PAGE_SIZE = 10;

const DEFAULT_PARAMS = [{ page: INITIAL_PAGE, pageSize: INITIAL_PAGE_SIZE }];

export type PageParams = { page: number; pageSize: number } & Obj;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRefreshService<T, R extends Page<T> = Page<T>, P extends PageParams[] = any[]>(
  service: Service<R, P>,
  options?: Options<R, P>
) {
  const { loading, data, params, runAsync } = useCustomRequest(service, {
    defaultParams: DEFAULT_PARAMS as P,
    ...options,
  });

  const refresh = async () => {
    try {
      await runAsync({ page: INITIAL_PAGE, pageSize: INITIAL_PAGE_SIZE });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  const loadMore = async () => {
    if (loading || !params || !params[0]) return;
    try {
      await runAsync({ ...params[0], page: params[0].page + 1 });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return {
    data,
    loading,
    refresh,
    loadMore,
  };
}
