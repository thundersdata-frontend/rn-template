/**
 * @description 用户角色解绑
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/role/resource/user/remove';

export async function fetch(data = {}) {
  const request = initRequest();
  const result = await request.post(backEndUrl + '/role/resource/user/remove', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
