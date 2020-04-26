/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-03-02 13:36:56
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-26 16:39:40
 */
import useRequest from '@umijs/use-request';
import { CombineService, BaseOptions } from '@umijs/use-request/lib/types';
import { FETCH_ERROR } from '../common';
import { useContext } from 'react';
import { SignInContext } from '../context/SignInContext';

export function useCustomRequest<T, P extends unknown[] = []>(
  service: CombineService<T, P>,
  options?: BaseOptions<T, P>
) {
  const { setSignedIn } = useContext(SignInContext);
  const { error, ...rest } = useRequest(service, options);

  if (error?.message === FETCH_ERROR.EXPIRED) {
    setSignedIn(false);
  }

  return rest;
}
