/**
 * @description 保存规则定义
 */

import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/data/rule/def/save';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/data/rule/def/save', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
