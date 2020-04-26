/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @Date: 2019-12-23 16:38:47
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-26 15:21:53
 */
/**
 * 根据数的大小进行单位转换
 * 这个函数不能引入外部变量或方法，否则会引起echarts图表异常！
 * */
export const valueFormat = (value: number) => {
  let valueStr: number | string = value;
  const fixDecimalPlace = (num: number, fixNum = 2) => (('' + num).includes('.') ? num.toFixed(fixNum) : num);
  if (value >= 10000 && value < 100000000) {
    valueStr = fixDecimalPlace(value / 10000) + '万';
  }
  if (value >= 100000000) {
    valueStr = fixDecimalPlace(value / 100000000) + '亿';
  }
  return valueStr;
};

/**
 * 0-9的整数 在前面补0
 * 用于月份、时分秒的情况
 * */
export const fillZero = (num: string | number) => (/^[0-9]$/.test('' + num) ? `0${num}` : num);

/**
 * 用于字符长度超过指定个数自动截取并添加...
 */
export const textEllipsis = (text: string, length = 12) => {
  if (text.length > length && length > 0) {
    return `${text.substr(0, length)}...`;
  }
  return text;
};
