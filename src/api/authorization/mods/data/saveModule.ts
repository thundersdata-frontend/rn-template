/**
 * @description 保存数据模块
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/data/module/save';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/data/module/save', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
