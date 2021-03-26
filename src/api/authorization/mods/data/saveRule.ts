/**
 * @description 保存数据规则
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;

export async function fetch(data = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/data/rule/save', {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return result;
}
