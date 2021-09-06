/* eslint-disable @typescript-eslint/ban-ts-comment */
import { authAtom } from 'atoms';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { LoginFailureEnum, RefreshStateEnum } from 'enums';
import { BaseOptions, Service } from 'hooks/useRequest/types';
import { useAsync } from 'hooks/useRequest/useAsync';
import { useAtom } from 'jotai';
import { signOut } from 'utils/auth';

// 初始化 page
const INITIAL_PAGE = 1;

interface BasicResult<T, P> {
  run: (args: P) => Promise<unknown>;
  refreshState: RefreshStateEnum;
  list: T[];
  headerRefresh: () => void;
  footerRefresh: () => void;
  updateParams: (params: P) => void;
}

function useRefreshService<T, R extends Page<T> = Page<T>, P extends any[] = any>(
  service: Service<R, P>,
  options?: Omit<BaseOptions<R, P>, 'onSuccess' | 'onError' | 'refreshDeps'> & {
    onSuccess?: (list: T[]) => void;
  },
): BasicResult<T, P>;

function useRefreshService<T>(service: any, options?: any) {
  const [auth, updateAuth] = useAtom(authAtom);
  const [refreshState, setRefreshState] = useSafeState(RefreshStateEnum.HeaderRefreshing);
  const [currentPage, setCurrentPage] = useSafeState(INITIAL_PAGE);
  const [list, setList] = useSafeState<T[]>([]);

  const promiseService = (...args: any) =>
    new Promise((resolve, reject) => {
      if (!auth.signedIn) {
        reject(JSON.stringify({ code: LoginFailureEnum.登录过期 }));
      }
      const s = service(...args);
      s.then(resolve).catch(reject);
    });

  const { run, params } = useAsync(promiseService, {
    defaultParams: [
      {
        page: INITIAL_PAGE,
        pageSize: 10,
      },
    ],
    ...options,
    onSuccess(data: any) {
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
      options?.onSuccess?.(_list);

      if (totalPage === 0) {
        setRefreshState(RefreshStateEnum.EmptyData);
      } else if (page === totalPage) {
        setRefreshState(RefreshStateEnum.NoMoreData);
      } else {
        setRefreshState(RefreshStateEnum.Idle);
      }
    },
    onError(err) {
      const { code } = JSON.parse(err.message);
      if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录过期, LoginFailureEnum.登录禁止].includes(code)) {
        signOut().then(() => {
          updateAuth({ signedIn: false });
        });
      } else if (currentPage === INITIAL_PAGE) {
        setList([]);
        options?.onSuccess?.([]);
      }
      setRefreshState(RefreshStateEnum.Failure);
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

  const updateParams = (params: any) => {
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

export { useRefreshService };
