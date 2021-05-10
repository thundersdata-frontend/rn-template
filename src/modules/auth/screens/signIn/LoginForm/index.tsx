import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import Form, { Field, useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import { Button, Checkable, CountDown, Flex, Icon, Input, WhiteSpace } from '@td-design/react-native';

import { LoginTab } from '../LoginTab';
import { useUpdateAtom } from 'jotai/utils';
import { useAuthService, authAtom } from 'modules/auth/authService';
import { mobilePhoneRules } from 'utils/validators';
import { ErrorMessage } from 'modules/auth/components/ErrorMessage';
import { AppTheme } from 'theme';
import { Text } from 'components/Text';

const FormContent = ({
  isSmsLogin,
  navigation,
}: {
  isSmsLogin: boolean;
  navigation: StackNavigationProp<AuthStackParamList, 'SignIn'>;
}) => {
  const [form] = useForm();
  const theme = useTheme<AppTheme>();
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
            <Text variant="forgetPass">忘记密码?</Text>
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
                  <Text variant="policy">我已阅读并同意</Text>
                  <TouchableOpacity
                    onPress={evt => {
                      evt.stopPropagation();
                    }}
                  >
                    <Text variant="policy" color="primary">
                      《雷数用户协议》
                    </Text>
                  </TouchableOpacity>
                  <Text variant="policy">和</Text>
                  <TouchableOpacity
                    onPress={evt => {
                      evt.stopPropagation();
                    }}
                  >
                    <Text variant="policy" color="primary">
                      《隐私政策》
                    </Text>
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

export function LoginForm({
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
  navigation: StackNavigationProp<AuthStackParamList, 'SignIn'>;
}) {
  const theme = useTheme<AppTheme>();
  const styles = StyleSheet.create({
    top: {
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderRadius: 20,
      height: 300,
      marginHorizontal: 18,
    },
  });

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
