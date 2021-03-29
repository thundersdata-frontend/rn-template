/**
 * @description 校验用户是否已经绑定该角色
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/role/resource/validateRoleUser';

export async function fetch(params = {}) {
  const request = initRequest();
  const result = await request.get(
    backEndUrl + '/role/resource/validateRoleUser',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    },
  );
  return result;
}
