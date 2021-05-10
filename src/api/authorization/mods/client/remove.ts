/**
 * @description delete
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/client/delete';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.delete(backEndUrl + '/client/delete', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
