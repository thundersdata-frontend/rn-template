import { useColorScheme } from 'react-native';
import { hide as hideSplash } from 'react-native-bootsplash';
import codePush from 'react-native-code-push';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import NiceModal from '@ebay/nice-modal-react';
import { useFlipper } from '@react-navigation/devtools';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { helpers, ThemeProvider } from '@td-design/react-native';
import { useMount } from '@td-design/rn-hooks';
import { Provider as JotaiProvider } from 'jotai';

import { Fallback } from '@/components';
import useUpdateService from '@/hooks/useUpdateService';
import { linking } from '@/linking';
import { navigationRef } from '@/services/NavigationService';
import { darkTheme, lightTheme } from '@/theme';

import Stack from './stacks';

const Main = () => {
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
              </NiceModal.Provider>
            </useUpdateService.Provider>
          </ThemeProvider>
        </JotaiProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export const App = codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  updateDialog: helpers.isIOS
    ? null
    : {
        // 是否显示更新描述
        appendReleaseDescription: true,
        // 更新描述的前缀。 默认为"Description"
        descriptionPrefix: '\n\n更新内容：\n',
        // 强制更新按钮文字，默认为continue
        mandatoryContinueButtonLabel: '立即更新',
        // 强制更新时的信息. 默认为"An update is available that must be installed."
        mandatoryUpdateMessage: '必须更新后才能使用',
        // 非强制更新时，按钮文字,默认为"ignore"
        optionalIgnoreButtonLabel: '稍后',
        // 非强制更新时，确认按钮文字. 默认为"Install"
        optionalInstallButtonLabel: '更新',
        // 非强制更新时，检查到更新的消息文本
        optionalUpdateMessage: '有新版本了，是否更新？',
        // Alert窗口的标题
        title: '应用更新',
      },
})(Main);
