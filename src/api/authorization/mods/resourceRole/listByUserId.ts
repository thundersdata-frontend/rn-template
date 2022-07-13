/**
 * @description 获取用户已绑定的ResourceRole
 */

import Config from 'react-native-config';

import { initRequest } from '../../../../common';

const backEndUrl = Config['authorization'];

// 初始值
export const init = [];
// 接口地址
export const url = '/role/resource/listByUserId';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/role/resource/listByUserId', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
