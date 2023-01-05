import { Notify } from '@td-design/react-native';
import { useMemoizedFn } from '@td-design/rn-hooks';

export function useToast() {
  const toastSuccess = (content: string) => {
    Notify.success({ content });
  };

  const toastFail = (content: string) => {
    Notify.fail({ content });
  };

  return {
    toastSuccess: useMemoizedFn(toastSuccess),
    toastFail: useMemoizedFn(toastFail),
  };
}
