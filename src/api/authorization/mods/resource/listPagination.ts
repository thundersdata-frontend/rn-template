/**
 * @description 查询资源列表
 */
import * as defs from '../../baseClass';
import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = new defs.authorization.PagingEntity();

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/resource/listPagination', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
