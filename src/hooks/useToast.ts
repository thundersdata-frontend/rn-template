import { useCallback } from 'react';

import { Notify } from '@td-design/react-native';

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
