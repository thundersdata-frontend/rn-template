/*
 * @文件描述: 账号密码登录页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @LastEditors: 陈杰
 * @Date: 2019-04-24 15:50:09
 * @LastEditTime: 2019-10-16 14:34:57
 */
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, Size } from '../../../../config';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import Input from '../../../../components/Input';
import GradientButton from '../../../../components/GradientButton';
import Iconfont from '../../../../components/Iconfont';
import { toastFail, FETCH_OPTIONS, AUTH_PARAMS } from '../../../../stores/common';
import { saveToken, saveUserInfo } from '../../../../utils/auth';
import request from '../../../../utils/request';
import { PersonInfo } from '../../../../interfaces/person';
import { useNetInfo } from '@react-native-community/netinfo';
import { MAX_LENGTH_USERNAME, MAX_LENGTH_PASSWORD } from '../../../../utils/validation';

interface AccountSignInProps extends NavigationInjectedProps {
  onToggle: (type: string) => void;
}

const inputValidate = (username: string, password: string) => {
  if (!username) {
    toastFail('请输入账号');
    return false;
  } else if (!password) {
    toastFail('请输入密码');
    return false;
  } else {
    return true;
  }
};

const AccountSignIn: React.FC<AccountSignInProps> = props => {
  const netInfo = useNetInfo();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (!netInfo.isConnected) {
      toastFail('设备未联网，请检查');
      return;
    }
    if (inputValidate(username, password)) {
      try {
        const response = await request.authForm<{ access_token: string }>(FETCH_OPTIONS.mine.login.url, {
          username,
          password,
          scope: AUTH_PARAMS.scope,
          client_id: AUTH_PARAMS.clientId,
          client_secret: AUTH_PARAMS.clientSecret,
          grant_type: 'password',
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
        <Iconfont style={styles.icon} name="user" size={Size.px(16)} color={Colors.labelColor} />
        <Input
          style={styles.input}
          value={username}
          onChangeText={value => setUsername(value.trim())}
          placeholder="请输入账号"
          maxLength={MAX_LENGTH_USERNAME}
        />
      </View>
      <View style={styles.item}>
        <Iconfont style={styles.icon} name="lock" size={Size.px(16)} color={Colors.labelColor} />
        <Input
          style={styles.narrowInput}
          secureTextEntry
          value={password}
          onChangeText={value => setPassword(value.trim())}
          placeholder="请输入密码"
          maxLength={MAX_LENGTH_PASSWORD}
        />
        <Text style={styles.extraText} onPress={() => props.navigation.navigate('ForgetPass')}>
          忘记密码?
        </Text>
      </View>
      <GradientButton style={styles.loginBtn} text="登 录" onPress={() => login()} />
    </View>
  );
};

export default withNavigation(AccountSignIn);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: Size.px(15),
    backgroundColor: Colors.white,
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
