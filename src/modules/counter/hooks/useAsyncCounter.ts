import { useState, useCallback } from 'react';

function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 200);
  });
}

export function useAsyncCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(x => x + 1), []);

  const incrementAsync = useCallback(async () => {
    await sleep();
    increment();
  }, [increment]);

  return {
    count,
    incrementAsync,
  };
}
