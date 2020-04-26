/*
 * @文件描述: 抽取分页逻辑
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-12 10:23:27
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-26 16:35:11
 */
import { useState, useCallback, useEffect, useContext } from 'react';
import { RefreshState } from '../components/RefreshListView';
import { PAGE, FETCH_ERROR } from '../common';
import isEmpty from 'lodash/isEmpty';
import { Pagination } from '../utils/type';
import useRequest from '@umijs/use-request';
import { useNavigation } from '@react-navigation/native';
import { SignInContext } from '../context/SignInContext';

export function useFocusRefresh<T>(fetchOption: { url: string; initialData: Pagination<T> }, params?: object) {
  const navigation = useNavigation();
  const [refreshState, setRefreshState] = useState(RefreshState.HeaderRefreshing);
  const { setSignedIn } = useContext(SignInContext);

  const asyncFn = useCallback(
    async (page = 1) => {
      if (page !== PAGE) {
        setRefreshState(RefreshState.FooterRefreshing);
      }
      if (!isEmpty(params)) {
        // return fetchData(fetchOption, {
        //   params: { ...params, page }
        // });
        return fetchOption.initialData;
      }
      return fetchOption.initialData;
    },
    [params, fetchOption]
  );

  const { data, reload, loadMore } = useRequest(
    (d: Pagination<T> | undefined) => asyncFn(d?.list.length ? d.page + 1 : 1),
    {
      loadMore: true,
      refreshDeps: [asyncFn],
      onSuccess: data => {
        const { total, page, pageSize } = data;
        if (total === 0) {
          setRefreshState(RefreshState.EmptyData);
        } else if (page * pageSize >= total) {
          setRefreshState(RefreshState.NoMoreData);
        } else {
          setRefreshState(RefreshState.Idle);
        }
      },
      onError: (error: Error) => {
        setRefreshState(RefreshState.Failure);
        if (error?.message === FETCH_ERROR.EXPIRED) {
          setSignedIn(false);
        }
      }
    }
  );

  const { list = [] } = data || {};

  useEffect(() => {
    navigation.addListener('focus', () => {
      reload();
    });

    return () => {
      navigation.removeListener('focus', () => {
        reload();
      });
    };
  }, [reload, navigation]);

  return {
    list,
    refreshState,
    setRefreshState,
    headerRefresh: reload,
    footerRefresh: loadMore
  };
}
