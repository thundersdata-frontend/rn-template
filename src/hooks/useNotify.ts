import { Notify } from '@td-design/react-native';
import { useMemoizedFn } from '@td-design/rn-hooks';

export function useNotify() {
  const successNotify = (content: string) => {
    Notify.success({ content });
  };

  const failNotify = (content: string) => {
    Notify.fail({ content });
  };

  return {
    successNotify: useMemoizedFn(successNotify),
    failNotify: useMemoizedFn(failNotify),
  };
}
