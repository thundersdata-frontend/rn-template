/**
 * @description 查询ResourceDetails
 */
import * as defs from '../../baseClass';
import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

// 初始值
export const init = new defs.authorization.ResourceDetails();
// 接口地址
export const url = '/resource/detail';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/resource/detail', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
