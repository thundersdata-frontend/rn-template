/**
 * @description log
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

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
