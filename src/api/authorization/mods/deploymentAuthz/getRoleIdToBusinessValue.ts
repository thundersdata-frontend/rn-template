/**
 * @description 获取能访问businessValue的RoleId
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/deployment/authz/getRoleIdToBusinessValue';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/deployment/authz/getRoleIdToBusinessValue', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
