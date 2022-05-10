import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { hide as hideSplash } from 'react-native-bootsplash';
import { ThemeProvider } from '@td-design/react-native';
import { useSafeState, useMount, useMemoizedFn } from '@td-design/rn-hooks';
import { useFlipper } from '@react-navigation/devtools';

import Stack from './stacks';
import { Fallback } from 'components';
import { lightTheme, darkTheme } from 'theme';
import { linking } from 'linking';
import { navigationRef } from 'services/NavigationService';
import { useNetwork } from 'hooks/useNetwork';
import useStackService from 'stacks/useStackService';

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

  useMount(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await hideSplash({ fade: true });
    });
  });

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
          <useStackService.Provider>
            <NavigationContainer
              ref={navigationRef}
              linking={linking}
              fallback={<Fallback />}
              theme={theme === 'dark' ? DarkTheme : DefaultTheme}
            >
              <Stack />
            </NavigationContainer>
          </useStackService.Provider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
