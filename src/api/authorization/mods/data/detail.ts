/**
 * @description 获取数据规则详情
 */
import * as defs from '../../baseClass';
import { initRequest } from '../../../../common';
import Config from 'react-native-config';

const backEndUrl = Config['authorization'];

// 初始值
export const init = new defs.authorization.DataRuleDTO();
// 接口地址
export const url = '/data/rule/detail';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/data/rule/detail', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
