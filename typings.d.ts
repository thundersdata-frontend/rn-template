/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-09 21:11:04
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-09 21:11:04
 */
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
declare module 'rc-form';
