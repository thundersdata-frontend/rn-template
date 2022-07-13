/**
 * @description 根据用户id列表查询其所有角色
 */

import Config from 'react-native-config';

import { initRequest } from '../../../../common';

const backEndUrl = Config['authorization'];

// 初始值
export const init = [];
// 接口地址
export const url = '/role/resource/listByUserIds';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/role/resource/listByUserIds', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
