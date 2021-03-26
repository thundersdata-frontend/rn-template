import { atom } from 'jotai';

class AuthService {
  authAtom = atom({
    signedIn: false,
  });
}
export default new AuthService();
