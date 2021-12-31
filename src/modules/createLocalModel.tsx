import React, { createContext, useContext } from 'react';

/**
 * 创建局部共享数据
 * @param hooks 自定义hooks
 * @returns
 */
export function createLocalModel<T extends Record<string, any>>(hooks: (...args: any[]) => T) {
  const Context = createContext<T>({} as any);

  const ModelProvider = ({ children }: { children?: React.ReactNode }) => (
    <Context.Provider value={hooks()}>{children}</Context.Provider>
  );

  const useModel = () => useContext(Context);
  useModel.Provider = ModelProvider;

  return useModel;
}
