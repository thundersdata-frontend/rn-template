import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import Form, { Field, useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { Button, Checkable, CountDown, Flex, Icon, Input, Theme, useTheme, WhiteSpace } from '@td-design/react-native';

import LoginTab from '../LoginTab';
import { useUpdateAtom } from 'jotai/utils';
import useAuthService, { authAtom } from 'modules/auth/authService';
import { mobilePhoneRules } from 'utils/validators';
import ErrorMessage from 'modules/auth/components/ErrorMessage';

const FormContent = ({
  isSmsLogin,
  navigation,
}: {
  isSmsLogin: boolean;
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SignIn'>;
}) => {
  const [form] = useForm();
  const theme = useTheme<Theme>();
  const updateAuth = useUpdateAtom(authAtom);
  const { error, clearError, submitFormFailed } = useAuthService();

  const handleFinish = (values: Store) => {
    console.log(values);
    updateAuth({ signedIn: true });
    // navigation.navigate('ConfigPass');
  };

  useEffect(() => {
    form.resetFields();
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSmsLogin]);

  return (
    <Form
      component={false}
      form={form}
      onFinish={handleFinish}
      onFinishFailed={submitFormFailed}
      onValuesChange={clearError}
    >
      <Field name="phone" rules={mobilePhoneRules}>
        <Input
          placeholder="请输入手机号"
          leftIcon={<Icon type="custom" name="login_iphone" color={theme.colors.primaryText_1} />}
          allowClear
        />
      </Field>
      <WhiteSpace size="xxl" />
      {isSmsLogin ? (
        <Field name="sms" rules={[{ required: true, message: '请输入验证码' }]}>
          <CountDown
            bordered
            leftIcon={<Icon type="custom" name="login_verify" color={theme.colors.primaryText_1} />}
            onClick={() => console.log('123')}
            onEnd={() => console.log('倒计时结束')}
          />
        </Field>
      ) : (
        <Field name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input
            inputType="password"
            placeholder="请输入密码"
            leftIcon={<Icon type="custom" name="icon_login_password" color={theme.colors.primaryText_1} />}
          />
        </Field>
      )}
      <Flex justifyContent="space-between" alignItems="flex-start" height={32} marginTop="xs">
        {!!error ? <ErrorMessage text={error} /> : <Text />}
        {!isSmsLogin && (
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ForgetPass')}>
            <Text style={{ fontSize: 14, lineHeight: 20, color: '#999' }}>忘记密码?</Text>
          </TouchableOpacity>
        )}
      </Flex>
      <Button onPress={form.submit} title="登录" />
      <Field name="agree" rules={[{ required: true, message: '请勾选雷数用户协议和隐私政策' }]}>
        <Checkable
          type="radio"
          options={[
            {
              value: 1,
              label: (
                <Flex justifyContent="flex-start" alignItems="center" style={{ marginLeft: -4 }}>
                  <Text style={styles.policy}>我已阅读并同意</Text>
                  <TouchableOpacity
                    onPress={evt => {
                      evt.stopPropagation();
                    }}
                  >
                    <Text style={[styles.policy, styles.link]}>《雷数用户协议》</Text>
                  </TouchableOpacity>
                  <Text style={styles.policy}>和</Text>
                  <TouchableOpacity
                    onPress={evt => {
                      evt.stopPropagation();
                    }}
                  >
                    <Text style={[styles.policy, styles.link]}>《隐私政策》</Text>
                  </TouchableOpacity>
                </Flex>
              ),
            },
          ]}
        />
      </Field>
    </Form>
  );
};

export default function LoginForm({
  showLoginForm,
  animation,
  isSmsLogin,
  changeTab,
  navigation,
}: {
  showLoginForm: Animated.SharedValue<boolean>;
  animation: Animated.SharedValue<number>;
  isSmsLogin: boolean;
  changeTab: (activeKey: string) => void;
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SignIn'>;
}) {
  const transition = useDerivedValue(() => (showLoginForm.value ? withSpring(1) : withSpring(0)));

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: mix(animation.value, 700, -100),
      },
      {
        scale: mix(animation.value, 0.4, 1),
      },
    ],
  }));

  const formStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: mix(transition.value, 700, 0) }],
  }));

  return (
    <Animated.View style={[styles.top, style]}>
      <LoginTab isSmsLogin={isSmsLogin} onPress={changeTab} />
      <Animated.View
        style={[
          {
            marginTop: 10,
            width: '100%',
            paddingHorizontal: 20,
          },
          formStyle,
        ]}
      >
        <FormContent {...{ isSmsLogin, navigation }} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  top: {
    marginHorizontal: 18,
    height: 300,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
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
