import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import WebView from 'react-native-webview';

interface CustomWebViewProps {
  strings: string; //富文本生成的string
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}

export const CustomWebView: FC<CustomWebViewProps> = ({ strings, style = { flex: 1 } }) => {
  return (
    <View style={style}>
      <WebView
        source={{ html: strings }}
        originWhitelist={['*']}
        allowUniversalAccessFromFileURLs={true}
        androidHardwareAccelerationDisabled={true} // false会导致安卓手机在9以及以上版本崩溃
        geolocationEnabled={false}
        mixedContentMode={'always'}
        javaScriptEnabled={true}
      />
    </View>
  );
};
