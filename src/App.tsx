import { useColorScheme } from 'react-native';
import { hide as hideSplash } from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import NiceModal from '@ebay/nice-modal-react';
import { useFlipper } from '@react-navigation/devtools';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@td-design/react-native';
import { useMount } from '@td-design/rn-hooks';
import { Provider as JotaiProvider } from 'jotai';

import useUpdateService from '@/hooks/useUpdateService';
import { linking } from '@/linking';
import { navigationRef } from '@/services/NavigationService';
import { darkTheme, lightTheme } from '@/theme';

import { Fallback } from './components/Fallback';
import Stack from './stacks';

export const App = () => {
  useFlipper(navigationRef);
  const theme = useColorScheme();

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
        <JotaiProvider>
          <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <useUpdateService.Provider>
              <NiceModal.Provider>
                <NavigationContainer
                  ref={navigationRef}
                  linking={linking}
                  fallback={<Fallback />}
                  theme={theme === 'dark' ? DarkTheme : DefaultTheme}
                >
                  <Stack />
                </NavigationContainer>
                {/* {Platform.OS === 'android' && <SafeAreaView mode="margin" edges={['bottom']} />} */}
              </NiceModal.Provider>
            </useUpdateService.Provider>
          </ThemeProvider>
        </JotaiProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
