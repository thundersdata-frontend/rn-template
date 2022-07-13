/**
 * @description 根据业务拓展字段查询角色(带分页)
 */
import Config from 'react-native-config';

import { initRequest } from '../../../../common';
import * as defs from '../../baseClass';

const backEndUrl = Config['authorization'];

// 初始值
export const init = new defs.authorization.PagingEntity();
// 接口地址
export const url = '/role/resource/listByBusinessValueListPagination';

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/role/resource/listByBusinessValueListPagination', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
