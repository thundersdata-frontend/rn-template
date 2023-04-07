import { Reducer, useReducer } from 'react';

import { storageService } from '@/services/StorageService';

export type AuthContextProps = {
  isSignedIn: boolean;
  isConfirmed: boolean;
};

export type Action =
  | {
      type: 'SIGN_IN';
    }
  | {
      type: 'CONFIRM';
    }
  | {
      type: 'SIGN_OUT';
    };

export default function useAuth() {
  const { confirmed, signedIn } = storageService;

  const reducer: Reducer<AuthContextProps, Action> = (prevState, action) => {
    switch (action.type) {
      case 'CONFIRM':
        return {
          ...prevState,
          isConfirmed: true,
        };

      case 'SIGN_IN':
        return {
          ...prevState,
          isSignedIn: true,
        };

      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignedIn: false,
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isConfirmed: confirmed,
    isSignedIn: signedIn,
  });

  return [state, dispatch] as const;
}
