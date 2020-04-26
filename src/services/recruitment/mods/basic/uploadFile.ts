/**
 * @description 上传文件接口
 */

import serverConfig from '../../../../../server.config';
import { request } from '../../../../common';

const backEndUrl = serverConfig()['recruitment'];

export const init = '';

export async function fetch(params = {}) {
  const result = await request.post(backEndUrl + '/basic/uploadFile', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params
  });
  if (!result.success) throw new Error(result.message);
  return result.data || '';
}
