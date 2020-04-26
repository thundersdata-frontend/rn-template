/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @Date: 2020-04-01 19:15:02
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-08 18:57:49
 */
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function useMask() {
  const [disabled, setDisabled] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setDisabled(false);
    }, [])
  );

  const toggleDisable = useCallback(() => {
    setDisabled(true);
  }, []);

  return { disabled, setDisabled, toggleDisable } as const;
}
