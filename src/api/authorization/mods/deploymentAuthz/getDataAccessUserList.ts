/**
 * @description 获取此数据权限的用户列表
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = [];
export const url = '/deployment/authz/getDataAccessUserList';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.get(
    backEndUrl + '/deployment/authz/getDataAccessUserList',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    },
  );
  return result;
}
