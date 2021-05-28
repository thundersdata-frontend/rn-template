/**
 * @description 根据用户id列表查询其所有角色
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

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
