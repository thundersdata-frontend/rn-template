/**
 * @description delete
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/client/delete';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.delete(backEndUrl + '/client/delete', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
