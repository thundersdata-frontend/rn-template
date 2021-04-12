import { useCallback, useRef } from 'react';

/**
 * 将函数挂到 ref 上，保证永远都是拿到最新状态的函数，往外暴露时使用 useCallback 包裹，保证函数引用不更新
 * @param callback
 * @returns
 */
export default function useRefCallback<T extends (...args: any[]) => any>(callback: T) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  return useCallback((...args: any[]) => callbackRef.current(...args), []) as T;
}
