/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-03-03 15:41:02
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-02 17:43:47
 */
import { createContext } from 'react';

interface SignInContextProps {
  setSignedIn: (signedIn: boolean) => void;
  setCheckedSignIn: (signedIn: boolean) => void;
}
export const SignInContext = createContext<SignInContextProps>({
  setSignedIn: (signedIn: boolean) => {
    console.log(signedIn);
  },
  setCheckedSignIn: (signedIn: boolean) => {
    console.log(signedIn);
  }
});
