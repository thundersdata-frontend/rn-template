import React, { useReducer } from 'react';
import { StyleSheet, StatusBar, Text, View, Platform, Image } from 'react-native';
import { SafeAreaView, NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Size, Colors } from '../../config';
import { MAX_LENGTH_PHONE, MAX_LENGTH_PASSWORD, MAX_LENGTH_SMS, MIN_LENGTH_PASSWORD } from '../../utils/validation';
import Input from '../../components/Input';
import { ActionProps } from '../../interfaces/common';
import GradientButton from '../../components/GradientButton';
import Iconfont from '../../components/Iconfont';
import { AuthSmsType, toastFail, FETCH_OPTIONS, AUTH_PARAMS, toastSuccess } from '../../stores/common';
import useSmsSend from '../../hooks/useSmsSend';
import regexUtils from '../../utils/regex-utils';
import request from '../../utils/request';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNetInfo } from '@react-native-community/netinfo';

const initialState = {
  phone: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
};

type State = typeof initialState;
function reducer(state: State, action: ActionProps): State {
  switch (action.type) {
    case 'phone':
      return {
        ...state,
        phone: action.value,
      };
    case 'code':
      return {
        ...state,
        code: action.value,
      };
    case 'new':
      return {
        ...state,
        newPassword: action.value,
      };
    case 'confirm':
      return {
        ...state,
        confirmPassword: action.value,
      };
    default:
      return initialState;
  }
}

interface ForgetPassProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

const inputValidate = (state: State) => {
  const { phone, code, newPassword, confirmPassword } = state;
  if (!phone) {
    toastFail('请输入手机号码');
    return false;
  } else if (!regexUtils.isPhone(phone)) {
    toastFail('手机号码格式不正确');
    return false;
  } else if (!code) {
    toastFail('请输入验证码');
    return false;
  } else if (!regexUtils.isNumber(code)) {
    toastFail('验证码只能是数字');
    return false;
  } else if (!newPassword) {
    toastFail('请输入密码');
    return false;
  } else if (newPassword.length < MIN_LENGTH_PASSWORD) {
    toastFail('密码至少要6位');
    return false;
  } else if (!confirmPassword) {
    toastFail('请再次输入密码');
    return false;
  } else if (newPassword !== confirmPassword) {
    toastFail('密码前后不一致');
    return false;
  } else {
    return true;
  }
};

const ForgetPass = (props: ForgetPassProps) => {
  const netInfo = useNetInfo();
  const [smsText, sendSms, clearSms] = useSmsSend();
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * 重置密码
   */
  const reset = async () => {
    if (!netInfo.isConnected) {
      toastFail('设备未联网，请检查');
      return;
    }
    if (inputValidate(state)) {
      const { phone, code, newPassword } = state;
      try {
        const result = await request.authForm(FETCH_OPTIONS.mine.forget.url, {
          username: phone,
          newPassword,
          verificationCode: code,
          clientId: AUTH_PARAMS.clientId,
          appVersion: AUTH_PARAMS.appVersion,
        });
        if (result.success) {
          toastSuccess('密码重置成功');
          clearSms();
          props.navigation.navigate('SignIn');
        } else {
          toastFail('重置密码失败');
        }
      } catch (error) {
        toastFail('重置密码失败');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'never', bottom: 'always' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
        enableOnAndroid
        extraHeight={Platform.select({ android: 170, ios: 100 })}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always" // 解决键盘关闭后点击登录无反应，需要再点一次的问题
      >
        <Image
          source={require('../../images/logo_bg.png')}
          style={{ width: Size.DEVICE_WIDTH, height: 300 }}
          resizeMode="cover"
        />
        <View style={styles.body}>
          <View style={styles.content}>
            <View style={styles.item}>
              <Iconfont style={styles.icon} name="phone" size={Size.px(16)} color={Colors.labelColor} />
              <Input
                value={state.phone}
                onChangeText={value => dispatch({ type: 'phone', value: value.trim() })}
                placeholder="请输入手机号"
                keyboardType="phone-pad"
                style={styles.input}
                maxLength={MAX_LENGTH_PHONE}
              />
            </View>
            <View style={styles.item}>
              <Iconfont style={styles.icon} name="shield" size={Size.px(16)} color={Colors.labelColor} />
              <Input
                style={styles.narrowInput}
                value={state.code}
                onChangeText={value => dispatch({ type: 'code', value: value.trim() })}
                placeholder="请输入验证码"
                autoCompleteType="off"
                keyboardType="number-pad"
                maxLength={MAX_LENGTH_SMS}
              />
              <Text style={styles.extraText} onPress={() => sendSms(state.phone, AuthSmsType.MODIFY)}>
                {smsText}
              </Text>
            </View>
            <View style={styles.item}>
              <Iconfont style={styles.icon} name="lock" size={Size.px(16)} color={Colors.labelColor} />
              <Input
                secureTextEntry
                value={state.newPassword}
                onChangeText={value => dispatch({ type: 'new', value: value.trim() })}
                placeholder="请输入新密码"
                style={styles.input}
                maxLength={MAX_LENGTH_PASSWORD}
              />
            </View>
            <View style={styles.item}>
              <Iconfont style={styles.icon} name="lock" size={Size.px(16)} color={Colors.labelColor} />
              <Input
                secureTextEntry
                value={state.confirmPassword}
                onChangeText={value => dispatch({ type: 'confirm', value: value.trim() })}
                placeholder="请再次输入新密码"
                style={styles.input}
                maxLength={MAX_LENGTH_PASSWORD}
              />
            </View>
          </View>
          <GradientButton text="确认重置" style={styles.loginBtn} onPress={() => reset()} />
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

export default ForgetPass;

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
  headerTitle: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Size.px(24),
    marginTop: Size.px(116),
  },
  body: {
    flex: 1,
    marginLeft: Size.px(16),
    marginRight: Size.px(16),
    marginTop: -Size.px(80),
    padding: Size.px(15),
    backgroundColor: Colors.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Size.px(40),
  },
  content: {
    paddingTop: Size.px(40),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: Size.px(56),
    paddingLeft: Size.px(12),
    paddingBottom: Size.px(5),
    borderBottomWidth: Size.ONE_PIXEL,
    borderBottomColor: Colors.borderColor,
  },
  icon: {
    flex: 1,
    height: Size.px(40),
    lineHeight: Size.px(40),
  },
  input: {
    flex: 9,
    fontSize: Size.px(16),
  },
  narrowInput: {
    flex: 6,
    fontSize: Size.px(16),
  },
  extraText: {
    flex: 3,
    textAlign: 'right',
    color: Colors.primary,
    paddingRight: Size.px(10),
    fontSize: Size.px(12),
    height: Size.px(40),
    lineHeight: Size.px(40),
  },
  loginBtn: {
    marginTop: Size.px(42),
  },
});
