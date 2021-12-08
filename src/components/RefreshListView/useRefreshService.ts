import { authAtom } from 'atoms';
import { useMemoizedFn, useSafeState, useRequest } from '@td-design/rn-hooks';
import { LoginFailureEnum, RefreshStateEnum } from 'enums';
import { useAtom } from 'jotai';
import { signOut } from 'utils/auth';
import { fetch } from '@react-native-community/netinfo';
import { useToast } from 'hooks/useToast';
import { Options, Service } from '@td-design/rn-hooks/lib/typescript/useRequest/types';

// 初始化 page
export const INITIAL_PAGE = 1;

export function useRefreshService<T, R extends Page<T> = Page<T>, P extends any[] = any>(
  service: Service<R, P>,
  options?: Omit<Options<R, P>, 'onSuccess'> & {
    onSuccess?: (list: T[]) => void;
  },
) {
  const { toastFail } = useToast();
  const [auth, updateAuth] = useAtom(authAtom);
  const [refreshState, setRefreshState] = useSafeState(-1);
  const [currentPage, setCurrentPage] = useSafeState(INITIAL_PAGE);
  const [list, setList] = useSafeState<T[]>([]);

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
  const { run, params } = useRequest(promiseService, {
    defaultParams: [
      {
        page: INITIAL_PAGE,
        pageSize: 10,
      },
    ] as P,
    ...restOptions,
    onBefore() {
      setRefreshState(RefreshStateEnum.HeaderRefreshing);
    },
    onSuccess(data: R) {
      // 对data进行处理
      const { list: resultList = [], total = 0, page = INITIAL_PAGE, totalPage = 0 } = data;
      setCurrentPage(page);

      let _list: T[] = [];
      if (total === 0) {
        _list = [];
      } else if (page === INITIAL_PAGE) {
        _list = resultList;
      } else {
        _list = list.concat(resultList);
      }
      setList(_list);

      if (totalPage === 0) {
        setRefreshState(RefreshStateEnum.EmptyData);
      } else if (page === totalPage) {
        setRefreshState(RefreshStateEnum.NoMoreData);
      } else {
        setRefreshState(RefreshStateEnum.Idle);
      }
      onSuccess?.(_list);
    },
    onError(err: any) {
      const { code, message } = JSON.parse(err.message);
      if (code) {
        if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录过期, LoginFailureEnum.登录禁止].includes(code)) {
          signOut().then(() => {
            updateAuth({ signedIn: false });
          });
        } else if (currentPage === INITIAL_PAGE) {
          setList([]);
        }
      }
      setRefreshState(RefreshStateEnum.Failure);
      toastFail(message);
      onError?.(err);
    },
  });

  /**
   * 从头开始刷新数据
   */
  const headerRefresh = () => {
    setRefreshState(RefreshStateEnum.HeaderRefreshing);
    run({ ...params[0], pageSize: 10, page: INITIAL_PAGE });
  };

  /**
   * 加载下一页数据
   */
  const footerRefresh = () => {
    setRefreshState(RefreshStateEnum.FooterRefreshing);
    const { page, pageSize } = params[0];
    run({ ...params[0], pageSize, page: page + 1 });
  };

  const updateParams = (params: P) => {
    setRefreshState(RefreshStateEnum.HeaderRefreshing);
    run({ ...params, pageSize: 10, page: INITIAL_PAGE });
  };

  return {
    run,
    refreshState,
    list,
    headerRefresh: useMemoizedFn(headerRefresh),
    footerRefresh: useMemoizedFn(footerRefresh),
    updateParams: useMemoizedFn(updateParams),
  };
}
