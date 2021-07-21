import produce from 'immer';
/**
 * 用于字符长度超过指定个数自动截取并添加...
 */
export const textEllipsis = (text: string, length: number) => {
  if (text.length > length && length > 0) {
    return `${text.substring(0, length)}...`;
  }
  return text;
};

export function convertNullToEmptyString<T>(obj: T) {
  return produce(obj, draft => {
    Object.entries(draft).forEach(([key, val]) => {
      if (val === null || val === undefined) {
        draft[key] = '';
      }
    });
  });
}

/**
 * 格式化数字
 * @param value
 * @param dots 小数位
 */
export const formatNumber = (value?: number | string, dots = 4) => {
  if (value) {
    if (typeof value === 'string' && !Number.isNaN(+value)) {
      return Number(value).toFixed(dots);
    } else if (typeof value === 'number') {
      return Number(value).toFixed(dots);
    }
  }
  return '0';
};
