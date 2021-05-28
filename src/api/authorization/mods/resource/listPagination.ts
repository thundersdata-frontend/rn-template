/**
 * @description 查询资源列表
 */
import * as defs from '../../baseClass';
import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = new defs.authorization.PagingEntity();
// 接口地址
export const url = '/resource/listPagination';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/resource/listPagination', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
