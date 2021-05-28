/**
 * @description 获取已创建的数据角色列表
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = [];
// 接口地址
export const url = '/role/data/list';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/role/data/list', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
