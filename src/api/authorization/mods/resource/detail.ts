/**
 * @description 查询ResourceDetails
 */
import Config from 'react-native-config';

import { initRequest } from '../../../../common';
import * as defs from '../../baseClass';

const backEndUrl = Config['authorization'];

// 初始值
export const init = new defs.authorization.ResourceDetails();
// 接口地址
export const url = '/resource/detail';

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/resource/detail', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
