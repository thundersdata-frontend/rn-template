/**
 * @description 保存数据角色
 */

import Config from 'react-native-config';

import { initRequest } from '../../../../common';

const backEndUrl = Config['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/role/data/save';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/role/data/save', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
