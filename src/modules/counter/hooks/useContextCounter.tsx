import React, { useState, useContext, useCallback } from 'react';

const CounterContext = React.createContext(1);

export const CounterProvider = ({ step, children }: { children?: React.ReactNode; step: number }) => (
  <CounterContext.Provider value={step}>{children}</CounterContext.Provider>
);

export function useContextCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const step = useContext(CounterContext);

  const increment = useCallback(() => setCount(x => x + step), [step]);

  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, reset };
}
