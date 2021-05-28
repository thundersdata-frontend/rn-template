/**
 * @description 获取角色对应的菜单树
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = [];
// 接口地址
export const url = '/resource/role/getMenuTree';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/resource/role/getMenuTree', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
