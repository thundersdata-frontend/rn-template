/**
 * @description log
 */

import Config from 'react-native-config';

import { initRequest } from '../../../../common';

const backEndUrl = Config['authorization'];

// 初始值
export const init = '';
// 接口地址
export const url = '/client/log';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/client/log', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
