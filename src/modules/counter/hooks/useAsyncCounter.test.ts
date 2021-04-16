import { renderHook, act } from '@testing-library/react-hooks';
import useAsyncCounter from './useAsyncCounter';

describe('useAsyncCounter', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('should increment counter after delay', async () => {
    const { result } = renderHook(() => useAsyncCounter());

    result.current.incrementAsync(); // async不需要放在act里

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.count).toBe(1);
  });
});
