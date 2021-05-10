/**
 * @description 用户角色解绑
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/role/resource/user/remove';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/role/resource/user/remove', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
