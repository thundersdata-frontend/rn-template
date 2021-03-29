/**
 * @description 获取apiUrl列表
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = [];
export const url = '/resource/user/listApiUrl';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.get(backEndUrl + '/resource/user/listApiUrl', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
