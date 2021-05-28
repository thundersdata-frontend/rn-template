/**
 * @description 保存数据规则
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/data/rule/save';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/data/rule/save', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
