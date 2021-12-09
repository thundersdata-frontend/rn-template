import { Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigationContainerRef } from '@react-navigation/native';
import { hide as hideSplash } from 'react-native-bootsplash';
import { ThemeProvider } from '@td-design/react-native';
import { useSafeState, useMount, useMemoizedFn } from '@td-design/rn-hooks';
import { useFlipper } from '@react-navigation/devtools';

import { Stack } from './stacks';
import { Fallback } from 'components';
import { lightTheme, darkTheme } from 'theme';
import { linking } from 'linking';

export function App() {
  const [theme, setTheme] = useSafeState(Appearance.getColorScheme());
  const navigationRef = useNavigationContainerRef<MainStackParamList & AuthStackParamList>();
  useFlipper(navigationRef);

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

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <NavigationContainer
          ref={navigationRef}
          linking={linking}
          fallback={<Fallback />}
          theme={theme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
