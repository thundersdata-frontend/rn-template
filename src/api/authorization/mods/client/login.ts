/**
 * @description login
 */
import * as defs from '../../baseClass';
import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = new defs.authorization.ClientConfig();

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/client/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
