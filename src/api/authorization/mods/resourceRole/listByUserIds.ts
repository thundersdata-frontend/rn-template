/**
 * @description 根据用户id列表查询其所有角色
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = [];
export const url = '/role/resource/listByUserIds';

export async function fetch(data = {}) {
  const request = initRequest();
  const result = await request.post(
    backEndUrl + '/role/resource/listByUserIds',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    },
  );
  return result;
}
