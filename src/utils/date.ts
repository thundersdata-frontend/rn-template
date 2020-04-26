/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2019-08-14 11:04:48
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-03-09 18:43:54
 */
import moment, { Moment } from 'moment';
import { valueType } from '../interfaces/common';

export const DATE_FORMAT_DAY_CN = 'YYYY年MM月DD日';

export interface MomentObjProps {
  start?: string;
  end?: string;
  startDate?: Date;
  endDate?: Date;
}

/**
 * 根据传入的日期和格式，返回格式化之后的日期
 * @param {*} date
 * @param {*} format
 */
export const formatDate = (date?: string | number | Date | Moment | number[], format = 'YYYY-MM-DD') => {
  if (!date) return '';
  return moment(date).format(format);
};

/**
 * @功能描述: 根据秒数返回日，小时，分钟格式
 * @参数: 秒（number)
 * @返回值: string
 */
export const transformTime = (second: number) => {
  const minute = Math.floor((second % (60 * 60)) / 60);
  const hour = Math.floor((second % (60 * 60 * 24)) / (60 * 60));
  const day = Math.floor(second / (60 * 60 * 24));
  return `${day ? day + '天' : ''}${hour ? hour + '小时' : ''}${minute ? minute + '分' : ''}`;
};

/**
 * 格式化视频时长
 * @param second
 */
export const formatTime = (second: number | string, hasHour = true) => {
  const h = 0;
  let i = 0,
    s = parseInt(second + '');
  if (s > 60) {
    i = parseInt(s / 60 + '');
    s = parseInt((s % 60) + '');
  }
  // 补零
  const zero = function (v: number) {
    return v >> 0 < 10 ? '0' + v : v;
  };
  if (hasHour) {
    return [zero(h), zero(i), zero(s)].join(':');
  }
  return [zero(i), zero(s)].join(':');
};

/**
 * 将 YYYYMMDD 的字符串转成 YYYY-MM-DD 的字符串
 * @param date
 */
export const dateStringFormat = (date: string) => {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  return `${year}-${month}-${day}`;
};

// 根据当前年份 向前推20年作为年份筛选条件
export const FILTER_YEAR_OPTION = Array.from({ length: 20 }, (_v, i) => ({
  label: `${new Date().getFullYear() - i}年`,
  value: new Date().getFullYear() - i
}));

export const linkDate = (year: number, month: number, day: number, time = '00:00:00') => {
  const monthStr = month < 10 ? `0${month}` : month;
  const dayStr = day < 10 ? `0${day}` : day;
  return `${year}-${monthStr}-${dayStr} ${time}`;
};

export const getFirstDayOfYear = (year: valueType) => {
  return `${year}-01-01`;
};

export const getLastDayOfYear = (year: valueType) => {
  return moment(getFirstDayOfYear(year)).endOf('year').format('YYYY-MM-DD');
};

export const getSeasonValue = () => {
  const current = new Date();
  const year = current.getFullYear();
  const month = current.getMonth() + 1;

  if (month <= 6) {
    return `${year - 1}`;
  }
  return `${year}`;
};
