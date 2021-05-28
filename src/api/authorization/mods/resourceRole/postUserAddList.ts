/**
 * @description 用户绑定ResourceRole（批量）
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/role/resource/user/addList';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/role/resource/user/addList', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
