/**
 * @description 获取ResourceRole列表
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

// 初始值
export const init = [];
// 接口地址
export const url = '/role/resource/list';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/role/resource/list', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
