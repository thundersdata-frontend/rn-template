import dayjs from 'dayjs';

export function formatDate(date: dayjs.ConfigType, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}
