/**
 * @description 保存ResourceRole
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/role/resource/save';

export async function fetch(data = {}) {
  const request = initRequest();
  const result = await request.post(backEndUrl + '/role/resource/save', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
