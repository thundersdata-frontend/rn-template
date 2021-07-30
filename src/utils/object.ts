import { isNull, isUndefined, omitBy } from 'lodash';

/**
 * 删除对象中为falsy的键值对
 * @param obj
 * @returns
 */
export function removeEmpty(obj: Record<string, any>) {
  return omitBy(
    {
      ...obj,
    },
    item => isNull(item) || isUndefined(item) || item == '',
  );
}
