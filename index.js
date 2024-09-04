import { Alert, AppRegistry, LogBox } from 'react-native';
import { Animated, TextInput } from 'react-native';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';
import { enableFreeze } from 'react-native-screens';

import { PullToRefresh } from '@sdcx/pull-to-refresh';
import { Text } from '@td-design/react-native';

import { name as appName } from './app.json';
import { App } from './src/App';
import CustomPullRefreshHeader from './src/components/CustomPullRefreshHeader';

enableFreeze();

PullToRefresh.setDefaultHeader(CustomPullRefreshHeader);

/** 如果你不想要让App的字体跟随系统字体，就需要下面这段代码 */
if (!Animated.Text.defaultProps) Animated.Text.defaultProps = {};
if (!Text.defaultProps) Text.defaultProps = {};
if (!TextInput.defaultProps) TextInput.defaultProps = {};
Animated.Text.defaultProps.allowFontScaling = false;
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;

/**
 * 未捕获的JS异常
 */
setJSExceptionHandler((error, isFatal) => {
  if (isFatal) {
    Alert.alert(
      '未知异常',
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${error.name} ${error.message}
        APP需要被重启
      `,
      [
        {
          text: '重启',
          onPress: () => {
            RNRestart.Restart();
          },
        },
      ]
    );
  } else {
    console.log(error); // So that we can see it in the ADB logs in case of Android if needed
  }
}, false);

/**
 * 未捕获的原生异常
 */
setNativeExceptionHandler(
  exceptionString => {
    console.log(exceptionString);
  },
  false,
  true
);

AppRegistry.registerComponent(appName, () => App);
