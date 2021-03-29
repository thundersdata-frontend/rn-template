/**
 * @description 批量添加资源
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/auth/resource/saveList';

export async function fetch(data = {}) {
  const request = initRequest();
  const result = await request.post(backEndUrl + '/auth/resource/saveList', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
