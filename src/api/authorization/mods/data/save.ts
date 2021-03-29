/**
 * @description 保存规则定义
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/data/rule/def/save';

export async function fetch(data = {}) {
  const request = initRequest();
  const result = await request.post(backEndUrl + '/data/rule/def/save', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
