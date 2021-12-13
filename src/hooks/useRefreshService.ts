import { authAtom } from 'atoms';
import { useMemoizedFn, useSafeState, useRequest } from '@td-design/rn-hooks';
import { LoginFailureEnum } from 'enums';
import { useAtom } from 'jotai';
import { signOut } from 'utils/auth';
import { fetch } from '@react-native-community/netinfo';
import { useToast } from 'hooks/useToast';
import { Options, Service } from '@td-design/rn-hooks/lib/typescript/useRequest/types';

// 初始化 page
export const INITIAL_PAGE = 1;

export type DataItem<T> = { page: number; items: T[] };

export function useRefreshService<T, R extends Page<T> = Page<T>, P extends any[] = any>(
  service: Service<R, P>,
  options?: Options<R, P>,
) {
  const { toastFail } = useToast();
  const [auth, updateAuth] = useAtom(authAtom);

  const [data, setData] = useSafeState<DataItem<T>[]>([]);
  const [allLoaded, setAllLoaded] = useSafeState(false);

  const promiseService = async (...args: P) => {
    const state = await fetch();
    if (!state.isConnected) {
      throw new Error(
        JSON.stringify({
          success: false,
          message: '网络连接异常',
        }),
      );
    }
    if (!auth.signedIn) {
      throw new Error(JSON.stringify({ code: LoginFailureEnum.登录过期 }));
    }
    return service(...args);
  };

  const { onSuccess, onError, ...restOptions } = options || {};

  const handleError = (err: any, params: P) => {
    const { code, message } = JSON.parse(err.message);
    if (code) {
      if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录过期, LoginFailureEnum.登录禁止].includes(code)) {
        signOut().then(() => {
          updateAuth({ signedIn: false });
        });
      }
    }
    toastFail(message);
    onError?.(err, params);
  };

  const { runAsync, params } = useRequest(promiseService, {
    defaultParams: [
      {
        page: INITIAL_PAGE,
        pageSize: 10,
      },
    ] as P,
    ...restOptions,
    onSuccess(data: R, params: P) {
      // 对data进行处理
      const { list, page = INITIAL_PAGE, totalPage = 0 } = data;
      const listItem: DataItem<T> = { page, items: list ?? [] };

      if (page === INITIAL_PAGE) {
        setData([listItem]);
      } else {
        setData(data => {
          const newData = [...data];
          newData.push(listItem);
          return newData;
        });
      }

      if (totalPage === 0 || totalPage === page) {
        setAllLoaded(true);
      } else {
        setAllLoaded(false);
      }

      onSuccess?.(data, params);
    },
    onError: handleError,
  });

  /**
   * 从头开始刷新数据
   */
  const onRefresh = async () => {
    try {
      setAllLoaded(false);
      await runAsync({ ...params[0], pageSize: 10, page: INITIAL_PAGE });
    } catch (error) {
      handleError(error, params as P);
    }
  };

  /**
   * 加载下一页数据
   */
  const onLoadMore = async () => {
    try {
      setAllLoaded(false);
      const { page, pageSize } = params[0];
      await runAsync({ ...params[0], pageSize, page: page + 1 });
    } catch (error) {
      handleError(error, params as P);
    }
  };

  const onUpdate = async (params: P) => {
    try {
      setAllLoaded(false);
      await runAsync({ ...params, pageSize: 10, page: INITIAL_PAGE });
    } catch (error) {
      handleError(error, params as P);
    }
  };

  return {
    allLoaded,
    data,

    onRefresh: useMemoizedFn(onRefresh),
    onLoadMore: useMemoizedFn(onLoadMore),
    onUpdate: useMemoizedFn(onUpdate),
  };
}
