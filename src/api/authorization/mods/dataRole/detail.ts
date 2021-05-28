/**
 * @description 获取数据角色详情
 */
import * as defs from '../../baseClass';
import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = new defs.authorization.DataRoleVO();
// 接口地址
export const url = '/role/data/detail';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/role/data/detail', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
