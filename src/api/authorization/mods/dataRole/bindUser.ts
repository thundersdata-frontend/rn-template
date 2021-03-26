/**
 * @description 用户批量绑定角色
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/role/data/bindUser', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
