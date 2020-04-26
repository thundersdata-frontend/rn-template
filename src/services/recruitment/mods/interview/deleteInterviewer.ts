/**
 * @description 删除面试记录
 */

import serverConfig from '../../../../../server.config';
import { request } from '../../../../common';

const backEndUrl = serverConfig()['recruitment'];

export const init = undefined;

export async function fetch(params = {}) {
  const result = await request.post(backEndUrl + '/interview/deleteInterviewer', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params
  });
  if (!result.success) throw new Error(result.message);
  return result.data || undefined;
}
