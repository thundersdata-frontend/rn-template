/**
 * @description save
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/client/save';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.post(backEndUrl + '/client/save', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params,
  });
  return result;
}
