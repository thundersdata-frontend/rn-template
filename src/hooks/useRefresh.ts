/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-12 10:23:27
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-18 15:38:12
 */
import { useState, useCallback, useRef, useLayoutEffect } from 'react';

export function useRefresh() {
  const [refreshing, setRefreshing] = useState(true);

  const refresh = useCallback(
    (nextValue: boolean) => {
      setRefreshing(nextValue);
    },
    [setRefreshing],
  );

  return [refreshing, refresh] as const;
}

/**
 * 下拉刷新时判断子组件请求是否全部返回
 * maxCount 所有需要的的请求数量
 * count 当前完成的数量
 * isComplete 是否全部返回
 * increase 自增
 * reSetCount 重置
 * */
export function useIncrease(maxCount: number) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);

  useLayoutEffect(() => {
    countRef.current = count;
  });

  const increase = useCallback(() => {
    setCount(countRef.current + 1);
  }, [setCount, countRef]);

  const reSetCount = useCallback(() => {
    setCount(0);
  }, [setCount]);

  const isComplete = maxCount !== 0 && maxCount === count;

  return [isComplete, increase, reSetCount] as const;
}
