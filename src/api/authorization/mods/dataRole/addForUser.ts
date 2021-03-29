/**
 * @description 数据角色绑定用户
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/role/data/add/user';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.post(backEndUrl + '/role/data/add/user', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params,
  });
  return result;
}
