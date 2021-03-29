/**
 * @description 用户绑定ResourceRole（批量）
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;
export const url = '/role/resource/user/addList';

export async function fetch(data = {}) {
  const request = initRequest();
  const result = await request.post(
    backEndUrl + '/role/resource/user/addList',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    },
  );
  return result;
}
