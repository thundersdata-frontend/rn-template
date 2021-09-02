import { renderHook } from '@testing-library/react-hooks';
import { useAsyncCounter } from './useAsyncCounter';

/**
 * https://github.com/testing-library/react-hooks-testing-library/issues/589#issuecomment-814918491
 */
describe('useAsyncCounter', () => {
  test('should increment counter after delay', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsyncCounter());

    result.current.incrementAsync(); // async不需要放在act里

    await waitForNextUpdate();

    expect(result.current.count).toBe(1);
  });
});
