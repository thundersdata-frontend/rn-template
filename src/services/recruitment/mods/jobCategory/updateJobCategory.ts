/**
 * @description 更新岗位类型
 */

import serverConfig from '../../../../../server.config';
import { request } from '../../../../common';

const backEndUrl = serverConfig()['recruitment'];

export const init = undefined;

export async function fetch(data = {}) {
  const result = await request.post(backEndUrl + '/jobCategory/updateJobCategory', {
    headers: {
      'Content-Type': 'application/json'
    },
    data
  });
  if (!result.success) throw new Error(result.message);
  return result.data || undefined;
}
