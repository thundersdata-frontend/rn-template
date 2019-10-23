/*
 * @文件描述: 类型定义
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-08-30 09:42:38
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-14 16:31:57
 */
export const tuple = <T extends string[]>(...args: T) => args;
export interface Pagination<T> {
  page: number;
  pageSize: number;
  total: number;
  list: T[];
}
export interface AjaxResponse<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}
export interface AuthResponse<T> {
  code: number;
  msg: string;
  result: T;
  success: boolean;
}
