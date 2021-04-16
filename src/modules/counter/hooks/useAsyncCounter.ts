import { useState, useCallback } from 'react';

export default function useAsyncCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(x => x + 1), []);

  const incrementAsync = useCallback(() => setTimeout(increment, 200), [increment]);

  return {
    count,
    incrementAsync,
  };
}
