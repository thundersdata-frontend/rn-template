import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, Size } from '../../../../config';
import { NavigationInjectedProps } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import Iconfont from '../../../../components/Iconfont';
import Input from '../../../../components/Input';
import GradientButton from '../../../../components/GradientButton';
import { toastFail, AuthSmsType, FETCH_OPTIONS, AUTH_PARAMS } from '../../../../stores/common';
import regexUtils from '../../../../utils/regex-utils';
import useSmsSend from '../../../../hooks/useSmsSend';
import { saveToken, saveUserInfo } from '../../../../utils/auth';
import { MAX_LENGTH_PHONE, MAX_LENGTH_SMS } from '../../../../utils/validation';
import request from '../../../../utils/request';
import { PersonInfo } from '../../../../interfaces/person';
import { useNetInfo } from '@react-native-community/netinfo';

interface MobileSignInProps extends NavigationInjectedProps {
  onToggle: (type: string) => void;
}

const inputValidate = (phone: string, captcha: string) => {
  if (!phone) {
    toastFail('请输入手机号码');
    return false;
  } else if (!regexUtils.isPhone(phone)) {
    toastFail('手机号码格式不正确');
    return false;
  } else if (!captcha) {
    toastFail('请输入验证码');
    return false;
  } else if (!regexUtils.isNumber(captcha)) {
    toastFail('验证码只能是数字');
    return false;
  } else {
    return true;
  }
};

const MobileSignIn: React.FC<MobileSignInProps> = props => {
  const netInfo = useNetInfo();
  const [phone, setPhone] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [smsText, sendSms, clearSms] = useSmsSend();

  const login = async () => {
    if (!netInfo.isConnected) {
      toastFail('设备未联网，请检查');
      return;
    }
    if (inputValidate(phone, captcha)) {
      try {
        const response = await request.authForm<{ access_token: string }>(FETCH_OPTIONS.mine.smsLogin.url, {
          phone,
          code: captcha,
          grant_type: 'sms',
          scope: AUTH_PARAMS.scope,
          client_id: AUTH_PARAMS.clientId,
          client_secret: AUTH_PARAMS.clientSecret,
          appVersion: AUTH_PARAMS.appVersion,
        });
        if (response.success) {
          const { result } = response;
          // 将token保存，同时获取用户信息
          saveToken(result.access_token);
          const userInfo = await request.authGet<PersonInfo>(FETCH_OPTIONS.mine.info.url, {
            access_token: result.access_token,
            requestClientId: AUTH_PARAMS.clientId,
            appVersion: AUTH_PARAMS.appVersion,
          });
          if (userInfo.success) {
            saveUserInfo(userInfo.result);
            clearSms();
            props.navigation.navigate('SignedIn');
          } else {
            toastFail('获取用户信息失败');
          }
        } else {
          toastFail('用户名或密码错误');
        }
      } catch (error) {
        toastFail('用户名或密码错误');
      }
    }
  };

  return (
    <View style={styles.content}>
      <View style={styles.item}>
        <Iconfont style={styles.icon} name="phone" size={Size.px(16)} color={Colors.labelColor} />
        <Input
          style={styles.input}
          value={phone}
          onChangeText={value => setPhone(value.trim())}
          placeholder="请输入手机号"
          autoCompleteType="off"
          keyboardType="phone-pad"
          maxLength={MAX_LENGTH_PHONE}
        />
      </View>
      <View style={styles.item}>
        <Iconfont style={styles.icon} name="shield" size={Size.px(16)} color={Colors.labelColor} />
        <Input
          style={styles.narrowInput}
          value={captcha}
          onChangeText={value => setCaptcha(value.trim())}
          placeholder="请输入验证码"
          autoCompleteType="off"
          keyboardType="number-pad"
          maxLength={MAX_LENGTH_SMS}
        />
        <Text style={styles.extraText} onPress={() => sendSms(phone, AuthSmsType.LOGIN)}>
          {smsText}
        </Text>
      </View>
      <GradientButton style={styles.loginBtn} text="登 录" onPress={() => login()} />
    </View>
  );
};

export default withNavigation(MobileSignIn);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: Size.px(15),
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
    marginTop: Size.px(92),
  },
});
