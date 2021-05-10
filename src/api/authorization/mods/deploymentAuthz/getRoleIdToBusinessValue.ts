/**
 * @description 获取能访问businessValue的RoleId
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

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
