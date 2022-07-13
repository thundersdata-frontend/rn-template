/**
 * @description 全部资源列表（树形）
 */

import Config from 'react-native-config';

import { initRequest } from '../../../../common';

const backEndUrl = Config['authorization'];

// 初始值
export const init = [];
// 接口地址
export const url = '/resource/listTree';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/resource/listTree', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
