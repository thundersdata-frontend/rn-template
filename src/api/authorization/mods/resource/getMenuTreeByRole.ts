/**
 * @description 获取角色对应的菜单树
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = [];
export const url = '/resource/role/getMenuTree';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.get(backEndUrl + '/resource/role/getMenuTree', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
