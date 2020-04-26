import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { enableScreens } from 'react-native-screens';
import { SignInContext } from './context/SignInContext';
import { MainStack } from './stacks/mainStack';
import { SignInStack } from './stacks/signInStack';
import store from './store';
import { isSignedIn } from './utils/auth';
import Orientation from 'react-native-orientation-locker';
import '@/services';

const { Provider: StoreProvider } = store;
enableScreens();
const App = () => {
  const [signedIn, setSignedIn] = useState(true);
  const [checkedSignIn, setCheckedSignIn] = useState(true);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  /**系统初始化时，判断是否已经登录 */
  useEffect(() => {
    (async () => {
      await isSignedIn();
      setSignedIn(true);
      setCheckedSignIn(true);
      SplashScreen.hide();
    })();
  }, []);

  if (!checkedSignIn) {
    return null;
  }
  return (
    <SignInContext.Provider
      value={{
        setSignedIn,
        setCheckedSignIn
      }}>
      <StoreProvider>
        <SafeAreaProvider>
          <NavigationContainer>{signedIn ? <MainStack /> : <SignInStack />}</NavigationContainer>
        </SafeAreaProvider>
      </StoreProvider>
    </SignInContext.Provider>
  );
};

export default App;
