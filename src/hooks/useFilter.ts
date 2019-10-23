/*
 * @文件描述: useFilter过滤组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-10-14 18:08:12
 * @LastEditors: 阮旭松
 * @LastEditTime: 2019-10-15 16:36:42
 */
import { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { valueType, valuesType } from '../interfaces/common';

export const useFilter = <T>(initialFilterObject: T) => {
  const [filterObject, setFilterObject] = useState<T>(initialFilterObject);
  const filterRef = useRef<T>(initialFilterObject);

  useLayoutEffect(() => {
    filterRef.current = filterObject;
  });

  const onFilterChange = useCallback(
    (value: valueType | valuesType | Date, field: string) => {
      const newFilterObject = { ...filterRef.current };
      newFilterObject[field] = value;
      setFilterObject(newFilterObject);
    },
    [setFilterObject, filterRef],
  );

  const onInit = useCallback(
    (newValue: T) => {
      setFilterObject(newValue);
    },
    [setFilterObject],
  );

  return [filterObject, onFilterChange, onInit] as const;
};
