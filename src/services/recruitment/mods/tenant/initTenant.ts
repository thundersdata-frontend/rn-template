/**
 * @description 初始化租户信息
 */
import * as defs from '../../baseClass';
import serverConfig from '../../../../../server.config';
import { request } from '../../../../common';

const backEndUrl = serverConfig()['recruitment'];

export const init = new defs.recruitment.DeferredResult();

export async function fetch(data = {}) {
  const result = await request.post(backEndUrl + '/tenant/init', {
    headers: {
      'Content-Type': 'application/json'
    },
    data
  });
  if (!result.success) throw new Error(result.message);
  return result.data || new defs.recruitment.DeferredResult();
}
