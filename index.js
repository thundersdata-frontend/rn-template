import { AppRegistry } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';

console.disableYellowBox = true;

/**这段代码加上之后，才可以在debug的时候看到网络请求 */
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
global.FormData = global.originalFormData || global.FormData;

if (window.FETCH_SUPPORT) {
  window.FETCH_SUPPORT.blob = false;
} else {
  global.Blob = global.originalBlob || global.Blob;
  global.FileReader = global.originalFileReader || global.FileReader;
}

AppRegistry.registerComponent(appName, () => App);
