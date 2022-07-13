/**
 * @description login
 */
import Config from 'react-native-config';

import { initRequest } from '../../../../common';
import * as defs from '../../baseClass';

const backEndUrl = Config['authorization'];

// 初始值
export const init = new defs.authorization.ClientConfig();
// 接口地址
export const url = '/client/login';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/client/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
