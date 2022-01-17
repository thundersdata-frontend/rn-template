import { Notify } from '@td-design/react-native';
import { useCallback } from 'react';

export function useToast() {
  const toastSuccess = useCallback((content: string) => {
    Notify.success({ content });
  }, []);

  const toastFail = useCallback((content: string) => {
    Notify.fail({ content });
  }, []);

  return {
    toastSuccess,
    toastFail,
  };
}
