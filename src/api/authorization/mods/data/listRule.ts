/**
 * @description 获取数据规则列表
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = [];

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/data/rule/list', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
