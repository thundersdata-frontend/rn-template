/**
 * @description 删除没有用户使用的角色
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

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
