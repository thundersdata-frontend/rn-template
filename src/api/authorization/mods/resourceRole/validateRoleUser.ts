/**
 * @description 校验用户是否已经绑定该角色
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/role/resource/validateRoleUser';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/role/resource/validateRoleUser', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
