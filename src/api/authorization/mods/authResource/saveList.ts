/**
 * @description 批量添加资源
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/auth/resource/saveList';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/auth/resource/saveList', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
