/**
 * @description 校验用户是否拥有权限
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/resource/getPermissionByUrl';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/resource/getPermissionByUrl', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
