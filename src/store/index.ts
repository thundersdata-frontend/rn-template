/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @Date: 2020-04-26 15:16:25
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-26 15:22:31
 */
import { createStore } from '@ice/store';

import user from './models/user';

const store = createStore({
  user
});

export default store;
