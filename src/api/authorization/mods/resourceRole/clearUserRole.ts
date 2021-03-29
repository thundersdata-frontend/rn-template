/**
 * @description 清除用户所有角色
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/role/resource/clearUserRole';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.post(
    backEndUrl + '/role/resource/clearUserRole',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params,
    },
  );
  return result;
}
