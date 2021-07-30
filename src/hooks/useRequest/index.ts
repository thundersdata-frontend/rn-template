/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import type { BaseOptions, BaseResult, Service } from './types';
import { useAsync } from './useAsync';

function useRequest<R = any, P extends any[] = any>(
  service: Service<R, P>,
  options?: BaseOptions<R, P>,
): BaseResult<R, P>;

function useRequest(service: any, options: any = {}) {
  const finalOptions = { ...options };

  const fetchProxy = (...args: any[]) =>
    // @ts-ignore
    fetch(...args).then((res: Response) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    });

  const promiseService = (...args: any[]) =>
    new Promise((resolve, reject) => {
      const s = service(...args);
      let fn = s;
      if (!s.then) {
        switch (typeof s) {
          case 'string':
          default:
            fn = fetchProxy(s);
            break;
          case 'object':
            const { url, ...rest } = s;
            fn = fetchProxy(url, rest);
            break;
        }
      }
      fn.then(resolve).catch(reject);
    });

  return useAsync(promiseService, finalOptions);
}

export { useRequest };
