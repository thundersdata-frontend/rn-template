import { Toast } from '@td-design/react-native';
import { useCallback } from 'react';

export function useToast() {
  const toastSuccess = useCallback((content: string) => {
    Toast.success({ content });
  }, []);

  const toastFail = useCallback((content: string) => {
    Toast.fail({ content });
  }, []);

  return {
    toastSuccess,
    toastFail,
  };
}
