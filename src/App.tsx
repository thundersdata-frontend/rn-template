import NiceModal from '@ebay/nice-modal-react';
import { useFlipper } from '@react-navigation/devtools';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@td-design/react-native';
import { useMemoizedFn, useMount, useSafeState } from '@td-design/rn-hooks';
import { Fallback } from 'components';
import { useNetwork } from 'hooks/useNetwork';
import { linking } from 'linking';
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { hide as hideSplash } from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from 'services/NavigationService';
import useStackService from 'stacks/useStackService';
import { darkTheme, lightTheme } from 'theme';

import Stack from './stacks';

export function App() {
  // 监听网络连接情况
  useNetwork();
  useFlipper(navigationRef);

  useMount(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await hideSplash({ fade: true });
    });
  });

  // 手机主题切换
  const [theme, setTheme] = useSafeState(Appearance.getColorScheme());

  const themeChange = useMemoizedFn(() => {
    setTheme(Appearance.getColorScheme());
  });

  useEffect(() => {
    const listener = Appearance.addChangeListener(themeChange);

    return () => listener.remove();
  });

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
          <useStackService.Provider>
            <NiceModal.Provider>
              <NavigationContainer
                ref={navigationRef}
                linking={linking}
                fallback={<Fallback />}
                theme={theme === 'dark' ? DarkTheme : DefaultTheme}
              >
                <Stack />
              </NavigationContainer>
            </NiceModal.Provider>
          </useStackService.Provider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
