/**
 * @description 校验用户是否已经绑定该角色
 */

import Config from 'react-native-config';

import { initRequest } from '../../../../common';

const backEndUrl = Config['authorization'];

// 初始值
export const init = false;
// 接口地址
export const url = '/auth/role/resource/hasRole';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/auth/role/resource/hasRole', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
