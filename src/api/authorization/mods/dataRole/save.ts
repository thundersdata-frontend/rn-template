/**
 * @description 保存数据角色
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/role/data/save';

export async function fetch(data = {}) {
  const request = initRequest();
  const result = await request.post(backEndUrl + '/role/data/save', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
