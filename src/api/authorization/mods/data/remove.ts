/**
 * @description 删除规则定义
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/data/rule/def/delete';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.post(backEndUrl + '/data/rule/def/delete', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params,
  });
  return result;
}
