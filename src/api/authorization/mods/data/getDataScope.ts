/**
 * @description 获取用户数据权限
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/data/getDataScope';

export async function fetch(data = {}) {
  const request = initRequest();
  const result = await request.post(backEndUrl + '/data/getDataScope', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
