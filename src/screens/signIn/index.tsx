import React, { useEffect } from 'react';
import { Platform, ImageBackground, Image, StatusBar } from 'react-native';
import AccountSignIn from './components/AccountSignIn';
import { Size } from '../../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Container from '../../components/Container';
import { Flex } from '@ant-design/react-native';

const SignIn = () => {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
  }, []);

  return (
    <Container style={{ marginTop: 0 }}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
        enableOnAndroid
        extraHeight={Platform.select({ android: 190, ios: 170 })}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always" // 解决键盘关闭后点击登录无反应，需要再点一次的问题
      >
        <ImageBackground
          source={require('../../images/pic_login_bg.png')}
          style={{ width: Size.DEVICE_WIDTH, flex: 1 }}
          resizeMode="stretch">
          <Flex align="center" justify="center" style={{ flex: 1 }}>
            <Image
              source={require('../../images/pic_login_logo.png')}
              style={{ width: Size.px(180), height: Size.px(180) }}
              resizeMode="contain"
            />
          </Flex>
          <AccountSignIn />
        </ImageBackground>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default SignIn;
