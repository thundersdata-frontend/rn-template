/**
 * @description 根据业务拓展字段查询角色(不带分页)
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

// 初始值
export const init = [];
// 接口地址
export const url = '/role/resource/listByBusinessValueList';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/role/resource/listByBusinessValueList', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
