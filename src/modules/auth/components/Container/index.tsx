import { FC } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container: FC = props => {
  return (
    <ImageBackground source={require('../../assets/bg.webp')} style={{ width, height }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>
    </ImageBackground>
  );
};
