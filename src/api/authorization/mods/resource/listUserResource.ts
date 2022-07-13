/**
 * @description 用户资源列表
 */

import Config from 'react-native-config';

import { initRequest } from '../../../../common';

const backEndUrl = Config['authorization'];

// 初始值
export const init = [];
// 接口地址
export const url = '/resource/user/list';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/resource/user/list', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
