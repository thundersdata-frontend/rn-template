/**
 * @description 获取模块列表
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = [];
// 接口地址
export const url = '/data/module/list';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/data/module/list', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
