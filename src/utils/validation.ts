import { Rule, InternalNamePath } from 'rc-field-form/lib/interface';

/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-06-27 17:43:30
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-30 16:13:14
 */
export const MAX_LENGTH_USERNAME = 16;
export const MAX_LENGTH_PASSWORD = 16;
export const MIN_LENGTH_PASSWORD = 6;
export const MAX_LENGTH_TITLE = 50;
export const MAX_LENGTH_DESC = 200;
export const MAX_LENGTH_COMMENT = 100;
export const MAX_LENGTH_PHONE = 11;
export const MAX_LENGTH_SMS = 6;

/**
 * 评分校验规则
 * @param _
 * @param value
 * @param callback
 */
export const ratingValidator = (_: Rule, value: number, callback: (msg?: string) => void) => {
  if (value > 0) {
    callback();
  } else {
    callback('');
  }
};

/**
 * 表单项是否处于error状态
 */
export const isError = (errorNames: InternalNamePath = [], fieldName: string) => {
  return errorNames.includes(fieldName);
};
