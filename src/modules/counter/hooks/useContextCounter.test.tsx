import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { CounterProvider, useContextCounter } from './useContextCounter';

test('should use custom step when incrementing', () => {
  const wrapper = ({ children }: { children?: React.ReactNode }) => (
    <CounterProvider step={2}>{children}</CounterProvider>
  );

  const { result } = renderHook(() => useContextCounter(), { wrapper });

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(2);
});

test('should use custom step when incrementing', () => {
  const wrapper = ({ step, children }: { children?: React.ReactNode; step: number }) => (
    <CounterProvider step={step}>{children}</CounterProvider>
  );

  const { result, rerender } = renderHook(() => useContextCounter(), {
    wrapper,
    initialProps: { step: 2 },
  });

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(2);

  rerender({ step: 8 });

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(10);
});
