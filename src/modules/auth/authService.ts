import { atom } from 'jotai';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { useCallback, useState } from 'react';

export const authAtom = atom({
  signedIn: true,
});

export default function useAuthService() {
  const [error, setError] = useState('');

  const submitFormFailed = useCallback((errorInfo: ValidateErrorEntity) => {
    const { errorFields } = errorInfo;
    if (errorFields.length > 0) {
      const error = errorFields[0];
      const { errors } = error;
      setError(errors[0]);
    }
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return {
    error,
    clearError,
    submitFormFailed,
  };
}
