/**
 * @description 获取拥有此角色的所有用户id
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = [];
// 接口地址
export const url = '/deployment/authz/getUserIdsByRoleId';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/deployment/authz/getUserIdsByRoleId', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
