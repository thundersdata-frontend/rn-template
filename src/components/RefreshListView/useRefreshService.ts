import { useCallback, useEffect, useState } from 'react';
import { LoginFailureEnum, RefreshStateEnum } from 'enums';
import { signOut } from 'utils/auth';
import { authAtom } from 'modules/auth/authService';
import { useUpdateAtom } from 'jotai/utils';

// 需要重新刷新的 page
const REFRESH_PAGE = 0;
// 初始化 page
const INITIAL_PAGE = 1;

export function useRefreshService<T>(
  service: ((data: Record<string, unknown>, params: Record<string, unknown>) => Promise<Page<T>>) | null,
  options?: {
    bodyParams?: Record<string, unknown>;
    params?: Record<string, unknown>;
  },
  callback?: (list: T[]) => void,
) {
  const updateAuth = useUpdateAtom(authAtom);
  const [refreshState, setRefreshState] = useState(RefreshStateEnum.HeaderRefreshing);
  const [currentPage, setCurrentPage] = useState(REFRESH_PAGE);
  const [list, setList] = useState<T[]>([]);
  const { bodyParams, params } = options || {};

  /** 设置 list */
  const handleSetList = useCallback(
    (newList: T[]) => {
      setList(newList);
      callback?.(newList);
    },
    [callback, setList],
  );

  useEffect(() => {
    setRefreshState(RefreshStateEnum.HeaderRefreshing);
  }, [bodyParams, params]);

  useEffect(() => {
    if (currentPage === REFRESH_PAGE) {
      setCurrentPage(INITIAL_PAGE);
      return;
    }
    if (!service) {
      setRefreshState(RefreshStateEnum.EmptyData);
      return;
    }
    service({ pageSize: 10, page: currentPage, ...bodyParams }, { ...params })
      .then(result => {
        const { list: resultList = [], total = 0, page = INITIAL_PAGE, totalPage = 0 } = result;
        setCurrentPage(page);
        if (total === 0) {
          handleSetList([]);
        } else if (page === INITIAL_PAGE) {
          handleSetList(resultList);
        } else {
          handleSetList(list.concat(resultList as any));
        }
        if (totalPage === 0) {
          setRefreshState(RefreshStateEnum.EmptyData);
        } else if (page === totalPage) {
          setRefreshState(RefreshStateEnum.NoMoreData);
        } else {
          setRefreshState(RefreshStateEnum.Idle);
        }
      })
      .catch(error => {
        const { code } = JSON.parse(error.message);
        if ([LoginFailureEnum.登录无效, LoginFailureEnum.登录过期, LoginFailureEnum.登录禁止].includes(code)) {
          signOut().then(() => {
            updateAuth({ signedIn: false });
          });
        } else if (currentPage === INITIAL_PAGE) {
          handleSetList([]);
          setRefreshState(RefreshStateEnum.Failure);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyParams, currentPage, params, service]);

  /**
   * 从头开始刷新数据
   */
  const headerRefresh = useCallback(() => {
    setCurrentPage(REFRESH_PAGE);
    setRefreshState(RefreshStateEnum.HeaderRefreshing);
  }, []);

  /**
   * 加载下一页数据
   */
  const footerRefresh = useCallback(() => {
    setCurrentPage(page => page + 1);
    setRefreshState(RefreshStateEnum.FooterRefreshing);
  }, []);

  return {
    refreshState,
    list,
    headerRefresh,
    footerRefresh,
  };
}
