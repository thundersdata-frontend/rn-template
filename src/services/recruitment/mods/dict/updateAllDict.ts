/**
 * @description 更新所有字典
 */

import serverConfig from '../../../../../server.config';
import { request } from '../../../../common';

const backEndUrl = serverConfig()['recruitment'];

export const init = undefined;

export async function fetch(params = {}) {
  const result = await request.get(backEndUrl + '/dict/updateAllDict', {
    headers: {
      'Content-Type': 'application/json'
    },
    params
  });
  if (!result.success) throw new Error(result.message);
  return result.data || undefined;
}
