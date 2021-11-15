import type { DependencyList } from 'react';

export type noop = (...args: any[]) => void;

export type Service<R, P extends any[]> = (...args: P) => Promise<R>;
export type Subscribe<R, P extends any[]> = (data: FetchResult<R, P>) => void;
export type Mutate<R> = (x: R | undefined | ((data: R) => R)) => void;

export type Fetches<R, P extends any[]> = Record<string, FetchResult<R, P>>;
export interface FetchResult<R, P extends any[]> {
  loading: boolean;
  data: R | undefined;
  error: Error | undefined;
  params: P;
  refresh: () => Promise<R>;
  mutate: Mutate<R>;
  run: (...args: P) => Promise<R>;
}

export interface FetchConfig<R, P extends any[]> {
  onSuccess?: (data: R, params: P) => void;
  onError?: (e: Error, params: P) => void;

  loadingDelay?: number; // loading delay
  throwOnError?: boolean;
}

export interface BaseResult<R, P extends any[]> extends FetchResult<R, P> {
  reset: () => void;
  fetches: {
    [key in string]: FetchResult<R, P>;
  };
}

export type BaseOptions<R, P extends any[]> = {
  refreshDeps?: DependencyList; // 如果 deps 变化后，重新请求
  manual?: boolean; // 是否需要手动触发
  onSuccess?: (data: R, params: P) => void; // 成功回调
  onError?: (e: Error, params: P) => void; // 失败回调
  defaultLoading?: boolean; // 默认 loading 状态
  defaultParams?: P;
  fetchKey?: (...args: P) => string;
  initialData?: R;
  throwOnError?: boolean;
};
