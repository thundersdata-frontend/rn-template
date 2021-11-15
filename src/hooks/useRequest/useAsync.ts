/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';
import { useSafeState } from '@td-design/rn-hooks';
import type { BaseOptions, BaseResult, FetchConfig, Fetches, FetchResult, Service, Subscribe } from './types';
import { usePersistFn } from './utils/usePersistFn';
import { useUpdateEffect } from './utils/useUpdateEffect';

const DEFAULT_KEY = 'AHOOKS_USE_REQUEST_DEFAULT_KEY';

class Fetch<R, P extends any[]> {
  config: FetchConfig<R, P>;
  service: Service<R, P>;
  // 请求时序
  count = 0;
  subscribe: Subscribe<R, P>;
  that: any = this;
  state: FetchResult<R, P> = {
    loading: false,
    params: [] as any,
    data: undefined,
    error: undefined,
    run: this.run.bind(this.that),
    mutate: this.mutate.bind(this.that),
    refresh: this.refresh.bind(this.that),
  };

  constructor(
    service: Service<R, P>,
    config: FetchConfig<R, P>,
    subscribe: Subscribe<R, P>,
    initState?: { data?: any; error?: any; params?: any; loading?: any },
  ) {
    this.service = service;
    this.config = config;
    this.subscribe = subscribe;
    if (initState) {
      this.state = {
        ...this.state,
        ...initState,
      };
    }
  }

  setState(s = {}) {
    this.state = {
      ...this.state,
      ...s,
    };
    this.subscribe(this.state);
  }

  _run(...args: P) {
    this.count += 1;
    // 闭包存储当次请求的 count
    const currentCount = this.count;

    this.setState({
      loading: true,
      params: args,
    });

    return this.service(...args)
      .then(res => {
        if (currentCount !== this.count) {
          // prevent run.then when request is canceled
          return new Promise(() => {});
        }
        this.setState({
          data: res,
          error: undefined,
          loading: false,
        });
        if (this.config.onSuccess) {
          this.config.onSuccess(res, args);
        }
        return res;
      })
      .catch(error => {
        if (currentCount !== this.count) {
          // prevent run.then when request is canceled
          return new Promise(() => {});
        }
        this.setState({
          data: undefined,
          error,
          loading: false,
        });
        if (this.config.onError) {
          this.config.onError(error, args);
        }
        // If throwOnError, user should catch the error self,
        // or the page will crash
        if (this.config.throwOnError) {
          throw error;
        }
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(
          'useRequest has caught the exception, if you need to handle the exception yourself, you can set options.throwOnError to true.',
        );
      });
  }

  run(...args: P): Promise<R> {
    return this._run(...args) as Promise<R>;
  }

  refresh() {
    return this.run(...this.state.params);
  }

  mutate(data: any) {
    this.setState({
      data,
    });
  }
}

function useAsync<R, P extends any[], U>(service: Service<R, P>, options?: BaseOptions<R, P>): BaseResult<U, P> {
  const _options = options || {};
  const {
    refreshDeps = [],
    manual = false,
    onSuccess = () => {},
    onError = () => {},
    defaultLoading = false,
    defaultParams = [],
    initialData,
    throwOnError = true,
  } = _options;

  const newestFetchKey = useRef(DEFAULT_KEY);

  // 持久化一些函数
  const servicePersist = usePersistFn(service) as any;
  const onSuccessPersist = usePersistFn(onSuccess);
  const onErrorPersist = usePersistFn(onError);

  const config = {
    onSuccess: onSuccessPersist,
    onError: onErrorPersist,
    throwOnError,
  };

  const [fetches, setFetches] = useSafeState<Fetches<U, P>>(() => {
    return {};
  });

  const subscribe = usePersistFn((key: string, data: any) => {
    setFetches(s => {
      // eslint-disable-next-line no-param-reassign
      s[key] = data;
      return { ...s };
    });
  }) as any;

  const fetchesRef = useRef(fetches);
  fetchesRef.current = fetches;

  const run = useCallback(
    (...args: P) => {
      const currentFetchKey = newestFetchKey.current;
      // 这里必须用 fetchesRef，而不能用 fetches。
      // 否则在 reset 完，立即 run 的时候，这里拿到的 fetches 是旧的。
      let currentFetch = fetchesRef.current[currentFetchKey];
      if (!currentFetch) {
        const newFetch = new Fetch(servicePersist, config, subscribe.bind(null, currentFetchKey), {
          data: initialData,
        });
        currentFetch = newFetch.state;
        setFetches(s => {
          // eslint-disable-next-line no-param-reassign
          s[currentFetchKey] = currentFetch;
          return { ...s };
        });
      }
      return currentFetch.run(...args);
    },
    [subscribe],
  );
  const runRef = useRef(run);
  runRef.current = run;

  // 第一次默认执行
  useEffect(() => {
    if (!manual) {
      // 第一次默认执行，可以通过 defaultParams 设置参数
      runRef.current(...(defaultParams as any));
    }
  }, []);

  // 重置 fetches
  const reset = useCallback(() => {
    newestFetchKey.current = DEFAULT_KEY;
    setFetches({});
    // 不写会有问题。如果不写，此时立即 run，会是老的数据
    fetchesRef.current = {};
  }, [setFetches]);

  //  refreshDeps 变化，重新执行所有请求
  useUpdateEffect(() => {
    if (!manual) {
      /* 全部重新执行 */
      Object.values(fetchesRef.current).forEach(f => {
        f.refresh();
      });
    }
  }, [...refreshDeps]);

  const notExecutedWarning = useCallback(
    (name: string) => () => {
      console.warn(`You shouldn't call ${name} when service not executed once.`);
    },
    [],
  );

  return {
    loading: !manual || defaultLoading,
    data: initialData,
    error: undefined,
    params: [],
    refresh: notExecutedWarning('refresh'),
    mutate: notExecutedWarning('mutate'),

    ...((fetches[newestFetchKey.current] as FetchResult<U, P> | undefined) || {}),
    run,
    fetches,
    reset,
  } as BaseResult<U, P>;
}

export { useAsync };
