/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-02-28 21:51:35
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-26 15:42:05
 */
export type RootParamList = {
  Drawer: undefined;
};

export type State = {
  key: string;
  index: number;
  routeNames: string[];
  type: string;
  routes: {
    key: string;
    name: string;
    params?: unknown;
  }[];
};
