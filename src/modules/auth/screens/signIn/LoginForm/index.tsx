import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, SpringUtils } from 'react-native-reanimated';
import { mix, useSpringTransition } from 'react-native-redash';
import Form, { Field, useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';

import LoginTab from '../LoginTab';
import { useNavigation } from '@react-navigation/core';
import { useUpdateAtom } from 'jotai/utils';
import authService from 'modules/auth/authService';

const FormContent = ({ translateY, isSmsLogin }: { translateY: Animated.Node<number>; isSmsLogin: boolean }) => {
  const [form] = useForm();
  const navigation = useNavigation();
  const updateAuth = useUpdateAtom(authService.authAtom);

  const handleFinish = (values: Store) => {
    console.log(values);
    updateAuth({ signedIn: true });
    // navigation.navigate('ConfigPass');
  };

  return (
    <Animated.View style={{ marginHorizontal: 20, marginTop: 30, flexGrow: 1, transform: [{ translateY }] }}>
      <Form component={false} form={form} onFinish={handleFinish}>
        {isSmsLogin ? (
          <>
            <Field name="phone" trigger="onChangeText">
              <TextInput
                placeholder="请输入手机号"
                style={{ borderWidth: 1, borderColor: '#e5e5e5', height: 48, marginBottom: 25 }}
              />
            </Field>
            <Field name="sms" trigger="onChangeText">
              <TextInput
                placeholder="请输入验证码"
                style={{ borderWidth: 1, borderColor: '#e5e5e5', height: 48, marginBottom: 25 }}
              />
            </Field>
          </>
        ) : (
          <>
            <Field name="username" trigger="onChangeText">
              <TextInput
                placeholder="请输入用户名"
                style={{ borderWidth: 1, borderColor: '#e5e5e5', height: 48, marginBottom: 25 }}
              />
            </Field>
            <Field name="password" trigger="onChangeText">
              <TextInput
                placeholder="请输入密码"
                style={{ borderWidth: 1, borderColor: '#e5e5e5', height: 48, marginBottom: 5 }}
              />
            </Field>
            <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')} style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 14, lineHeight: 20, color: '#999' }}>忘记密码?</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={form.submit} style={styles.loginBtn}>
          <Text style={{ fontSize: 18, lineHeight: 22, color: '#fff', fontWeight: '500' }}>登录</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.policy}>我已阅读并同意</Text>
          <TouchableOpacity>
            <Text style={[styles.policy, styles.link]}>《雷数用户协议》</Text>
          </TouchableOpacity>
          <Text style={styles.policy}>和</Text>
          <TouchableOpacity>
            <Text style={[styles.policy, styles.link]}>《隐私政策》</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Form>
    </Animated.View>
  );
};

export default function LoginForm({
  showLoginForm,
  showAnimation,
}: {
  showLoginForm: number;
  showAnimation: Animated.Node<number>;
}) {
  const [activeKey, setActiveKey] = useState('sms');
  const isSmsLogin = activeKey === 'sms';

  const transition = useSpringTransition(showLoginForm, {
    ...SpringUtils.makeDefaultConfig(),
    damping: 12,
  });
  const translateY = mix(transition, 700, 0);

  return (
    <Animated.View
      style={{
        alignItems: 'center',
        transform: [
          {
            translateY: interpolate(showAnimation, {
              inputRange: [0, 1],
              outputRange: [700, -100],
              extrapolate: Extrapolate.CLAMP,
            }),
          },
          {
            scale: interpolate(showAnimation, {
              inputRange: [0, 1],
              outputRange: [0.4, 1],
              extrapolate: Extrapolate.CLAMP,
            }),
          },
        ],
      }}
    >
      <View style={styles.top}>
        <LoginTab isSmsLogin={isSmsLogin} onPress={setActiveKey} />
        <FormContent {...{ translateY, isSmsLogin }} />
      </View>
      <View style={styles.bottom} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  top: {
    width: 346,
    height: 350,
    borderRadius: 20,
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 9,
    top: -10,
  },
  bottom: {
    width: 320,
    height: 350,
    borderRadius: 30,
    backgroundColor: '#C6E1FD',
    position: 'absolute',
    zIndex: 1,
  },
  loginBtn: {
    marginVertical: 15,
    backgroundColor: '#3171F0',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  policy: {
    fontSize: 12,
    lineHeight: 17,
    color: '#999999',
  },
  link: {
    color: '#3171F0',
  },
});
