/**
 * @description 删除ResourceRole
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/role/resource/delete';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/role/resource/delete', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params,
  });
  return result;
}
