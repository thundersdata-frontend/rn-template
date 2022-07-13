/**
 * @description 校验角色是否已经存在
 */

import Config from 'react-native-config';

import { initRequest } from '../../../../common';

const backEndUrl = Config['authorization'];

// 初始值
export const init = [];
// 接口地址
export const url = '/role/resource/validateRoleName';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/role/resource/validateRoleName', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
