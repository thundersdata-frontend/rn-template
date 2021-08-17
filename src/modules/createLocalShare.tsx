import React, { createContext, useContext } from 'react';

/**
 * 创建局部共享数据
 * @param hooks 自定义hooks
 * @returns
 */
export function createLocalShare(hooks: (...args: any[]) => any) {
  const Context = createContext({});

  const ModelProvider = ({ children }: { children?: React.ReactNode }) => (
    <Context.Provider value={hooks()}>{children}</Context.Provider>
  );

  const useModel = () => useContext(Context);
  useModel.Provider = ModelProvider;

  return useModel;
}
