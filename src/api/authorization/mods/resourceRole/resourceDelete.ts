/**
 * @description 删除ResourceRole
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/role/resource/delete';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.post(backEndUrl + '/role/resource/delete', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params,
  });
  return result;
}
