/**
 * @description 保存ResourceRole
 */

import Config from 'react-native-config';

import { initRequest } from '../../../../common';

const backEndUrl = Config['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/role/resource/save';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/role/resource/save', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
