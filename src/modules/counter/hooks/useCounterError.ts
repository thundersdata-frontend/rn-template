import { useState, useCallback } from 'react';

export function useCounterError(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(count => count + 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  if (count > 9000) {
    throw Error("It's over 9000!");
  }

  return {
    count,
    increment,
    reset,
  };
}
