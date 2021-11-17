import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { hide as hideSplash } from 'react-native-bootsplash';
import { SWRConfig } from 'swr';
import { useUpdateAtom } from 'jotai/utils';
import { ThemeProvider } from '@td-design/react-native';
import { useSafeState, useMount, useMemoizedFn } from '@td-design/rn-hooks';

import { Stack } from './stacks';
import { authAtom } from 'atoms';
import { Fallback } from 'components';
import { lightTheme, darkTheme } from 'theme';
import { linking } from 'linking';
import { Appearance } from 'react-native';

export function App() {
  const updateAuth = useUpdateAtom(authAtom);
  const [theme, setTheme] = useSafeState(Appearance.getColorScheme());

  const themeChange = useMemoizedFn(() => {
    setTheme(Appearance.getColorScheme());
  });

  useMount(() => {
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

  /**
   * 全局的错误处理，当接口返回的是登录失败时自动登出进入登录页面重新登录
   * @param error
   */
  const handleError = (error: Error) => {
    if (error.message === 'LoginFailure') {
      updateAuth({ signedIn: false });
    }
  };

  return (
    <SafeAreaProvider>
      <SWRConfig
        value={{
          onError: handleError,
        }}
      >
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
          <NavigationContainer
            linking={linking}
            fallback={<Fallback />}
            theme={theme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <Stack />
          </NavigationContainer>
        </ThemeProvider>
      </SWRConfig>
    </SafeAreaProvider>
  );
}
