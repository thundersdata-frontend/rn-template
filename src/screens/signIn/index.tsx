import React, { useState } from 'react';
import { StyleSheet, StatusBar, Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import AccountSignIn from './components/AccountSignIn';
import MobileSignIn from './components/MobileSignIn';
import { Size, Colors } from '../../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignIn = () => {
  const [type, changeType] = useState('mobile');
  // 是否为账号登录
  const isAccount = type !== 'mobile';

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'never', bottom: 'always' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
        enableOnAndroid
        extraHeight={Platform.select({ android: 170, ios: 150 })}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always" // 解决键盘关闭后点击登录无反应，需要再点一次的问题
      >
        <Image
          source={require('../../images/logo_bg.png')}
          style={{ width: Size.DEVICE_WIDTH, height: 300 }}
          resizeMode="cover"
        />
        <View style={styles.body}>
          <View style={styles.flexBox}>
            <View style={styles.loginTabs}>
              <TouchableOpacity
                style={styles[!isAccount ? 'activeTabItem' : 'loginTabsItem']}
                onPress={() => changeType('mobile')}
              >
                <Text style={styles[!isAccount ? 'activeTabText' : 'loginTabsText']}>快速登录</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles[isAccount ? 'activeTabItem' : 'loginTabsItem']}
                onPress={() => changeType('account')}
              >
                <Text style={styles[isAccount ? 'activeTabText' : 'loginTabsText']}>密码登录</Text>
              </TouchableOpacity>
            </View>
          </View>
          {isAccount ? <AccountSignIn onToggle={changeType} /> : <MobileSignIn onToggle={changeType} />}
        </View>
        <View style={styles.footer}>
          <Text
            style={{
              borderRightWidth: Size.ONE_PIXEL,
              borderRightColor: Colors.black,
              paddingRight: Size.px(10),
              marginRight: Size.px(10),
            }}
          >
            条款与条件
          </Text>
          <Text>隐私政策</Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    height: Size.px(300),
    textAlign: 'center',
    alignItems: 'center',
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Size.px(24),
    marginTop: Size.px(116),
  },
  body: {
    flex: 1,
    marginLeft: Size.px(10),
    marginRight: Size.px(10),
    marginTop: -Size.px(80),
    backgroundColor: Colors.white,
  },
  loginTabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Size.px(170),
    marginTop: Size.px(32),
  },
  loginTabsItem: {
    borderBottomWidth: Size.px(2),
    borderBottomColor: 'transparent',
    paddingBottom: Size.px(10),
  },
  activeTabItem: {
    borderBottomWidth: Size.px(2),
    borderBottomColor: Colors.primary,
    paddingBottom: Size.px(10),
  },
  loginTabsText: {
    fontSize: Size.px(14),
    color: Colors.black,
  },
  activeTabText: {
    fontSize: Size.px(14),
    color: Colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Size.px(40),
  },
});
