import { useCreation } from '@td-design/rn-hooks';
import React, { createContext, useContext } from 'react';

/**
 * 创建局部共享数据
 * @param hooks 自定义hooks
 * @returns
 */
export function createLocalModel<T extends Record<string, any>>(hooks: (...args: any[]) => T) {
  const Context = createContext<T>({} as any);

  const ModelProvider = ({ children }: { children?: React.ReactNode }) => {
    const contextValue = useCreation(() => hooks(), []); // 通过useCreation保证contextValue不会被重新计算
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  const useModel = () => useContext(Context);
  useModel.Provider = ModelProvider;

  return useModel;
}
