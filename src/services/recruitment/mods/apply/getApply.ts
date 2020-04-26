/**
 * @description 获取应聘信息
 */

import serverConfig from '../../../../../server.config';
import { request } from '../../../../common';

const backEndUrl = serverConfig()['recruitment'];

export const init = [];

export async function fetch(params = {}) {
  const result = await request.get(backEndUrl + '/apply/getApply', {
    headers: {
      'Content-Type': 'application/json'
    },
    params
  });
  if (!result.success) throw new Error(result.message);
  return result.data || [];
}
