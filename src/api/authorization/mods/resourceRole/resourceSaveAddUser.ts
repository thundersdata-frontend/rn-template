/**
 * @description 保存ResourceRole并绑定用户角色
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/role/resource/save/addUser';

export async function fetch(data = {}) {
  const request = initRequest();
  const result = await request.post(
    backEndUrl + '/role/resource/save/addUser',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    },
  );
  return result;
}
