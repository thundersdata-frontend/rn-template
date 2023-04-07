import { createContext, useContext } from 'react';

import useAuthService from '@/hooks/useAuth';

export const AuthContext = createContext<ReturnType<typeof useAuthService> | null>(null);

export function useIsConfirmed() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useIsConfirmed must be used within a AuthProvider');
  }
  const [state] = value;
  return !state.isConfirmed;
}

export function useIsSignedIn() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useIsSignedIn must be used within a AuthProvider');
  }
  const [state] = value;
  return !!state.isSignedIn;
}

export function useIsSignedOut() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useIsSignedOut must be used within a AuthProvider');
  }
  const [state] = value;
  return !state.isSignedIn;
}
