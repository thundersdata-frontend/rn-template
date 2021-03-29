/**
 * @description 删除资源
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/resource/delete';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.post(backEndUrl + '/resource/delete', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params,
  });
  return result;
}
