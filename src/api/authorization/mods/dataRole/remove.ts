/**
 * @description 删除数据角色
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/role/data/delete';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.post(backEndUrl + '/role/data/delete', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params,
  });
  return result;
}
