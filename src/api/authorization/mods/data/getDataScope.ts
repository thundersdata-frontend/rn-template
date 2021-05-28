/**
 * @description 获取用户数据权限
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/data/getDataScope';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/data/getDataScope', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
