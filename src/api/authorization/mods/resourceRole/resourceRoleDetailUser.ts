/**
 * @description 获取ResourceRole详情包含对应用户
 */
import * as defs from '../../baseClass';
import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = new defs.authorization.ResourcePageObject();
// 接口地址
export const url = '/role/resource/detail/user';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/role/resource/detail/user', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
