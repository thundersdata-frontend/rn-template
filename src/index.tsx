import React, { useState, useEffect } from 'react';
import { createRootNavigator } from './router';
import { isSignedIn } from './utils/auth';
import { Provider } from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [checkedSignIn, setCheckedSignIn] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    // 判断是否登录
    const firstLoad = async () => {
      const res = await isSignedIn();
      setSignedIn(res);
      setCheckedSignIn(true);
    };
    firstLoad();
  }, []);

  console.disableYellowBox = true;
  if (!checkedSignIn) {
    return null;
  }
  const RootNavigator = createRootNavigator(signedIn);
  return (
    <Provider>
      <RootNavigator />
    </Provider>
  );
}
