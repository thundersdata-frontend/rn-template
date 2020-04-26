/**
 * @description 获取人才池目录
 */
import * as defs from '../../baseClass';
import serverConfig from '../../../../../server.config';
import { request } from '../../../../common';

const backEndUrl = serverConfig()['recruitment'];

export const init = new defs.recruitment.TreeListDTO();

export async function fetch(params = {}) {
  const result = await request.get(backEndUrl + '/personPool/getPersonPool', {
    headers: {
      'Content-Type': 'application/json'
    },
    params
  });
  if (!result.success) throw new Error(result.message);
  return result.data || new defs.recruitment.TreeListDTO();
}
