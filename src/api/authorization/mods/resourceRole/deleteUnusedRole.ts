/**
 * @description 删除没有用户使用的角色
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/role/resource/deleteUnusedRole';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/role/resource/deleteUnusedRole', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
