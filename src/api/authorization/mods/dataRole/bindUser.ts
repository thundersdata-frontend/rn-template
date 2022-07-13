/**
 * @description 用户批量绑定角色
 */

import Config from 'react-native-config';

import { initRequest } from '../../../../common';

const backEndUrl = Config['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/role/data/bindUser';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/role/data/bindUser', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
