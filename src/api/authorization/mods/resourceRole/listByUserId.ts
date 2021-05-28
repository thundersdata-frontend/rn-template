/**
 * @description 获取用户已绑定的ResourceRole
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

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
