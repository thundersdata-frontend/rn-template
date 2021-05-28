/**
 * @description delete
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/client/delete';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.delete(backEndUrl + '/client/delete', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
