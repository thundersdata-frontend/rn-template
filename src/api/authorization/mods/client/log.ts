/**
 * @description log
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = '';
export const url = '/client/log';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.get(backEndUrl + '/client/log', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
