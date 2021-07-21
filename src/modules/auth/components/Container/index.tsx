import { FC } from 'react';
import { ImageBackground, StatusBar, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container: FC = props => {
  const { width, height } = useWindowDimensions();
  return (
    <ImageBackground
      source={require('../../assets/bg.webp')}
      style={{
        width,
        // 防止在某些手机上高度不够，目前发现的是华为nova6
        height: height * 1.2,
      }}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>
    </ImageBackground>
  );
};
