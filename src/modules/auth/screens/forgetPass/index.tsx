/**
 * 通过手机号登录时，设置登录密码
 */
import React, { FC } from 'react';
import Form, { Field, useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { Icon, Input, useTheme, Theme, WhiteSpace, CountDown, Button, Box } from '@td-design/react-native';

import AuthTemplate from 'modules/auth/components/AuthTemplate';
import { mobilePhoneRules, passwordRules } from 'utils/validators';
import useAuthService from 'modules/auth/authService';
import ErrorMessage from 'modules/auth/components/ErrorMessage';

const FormContent: FC<{ onFinish: (values: Store) => void }> = ({ onFinish }) => {
  const [form] = useForm();
  const theme = useTheme<Theme>();
  const { error, clearError, submitFormFailed } = useAuthService();

  return (
    <Form
      component={false}
      form={form}
      onFinish={onFinish}
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
      <Field name="sms" rules={[{ required: true, message: '请输入验证码' }]}>
        <CountDown
          bordered
          leftIcon={<Icon type="custom" name="login_verify" color={theme.colors.primaryText_1} />}
          onClick={() => console.log('123')}
          onEnd={() => console.log('倒计时结束')}
        />
      </Field>
      <WhiteSpace size="xxl" />
      <Field name="password" rules={passwordRules}>
        <Input
          placeholder="6-20位字母和数字组合"
          inputType="password"
          leftIcon={<Icon type="custom" name="icon_login_password" color={theme.colors.primaryText_1} />}
        />
      </Field>
      <WhiteSpace size="xxl" />
      <Field
        name="confirmPass"
        dependencies={['password']}
        rules={[
          ...passwordRules,
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一致!'));
            },
          }),
        ]}
      >
        <Input
          placeholder="请再次输入密码"
          inputType="password"
          leftIcon={<Icon type="custom" name="icon_login_password" color={theme.colors.primaryText_1} />}
        />
      </Field>
      <Box height={32} marginTop="xs">
        <ErrorMessage text={error} />
      </Box>
      <Button onPress={form.submit} title="确认" />
    </Form>
  );
};

export default function ForgetPass({ navigation }: { navigation: NativeStackNavigationProp<AuthStackParamList> }) {
  const handleFinish = (values: Store) => {
    console.log(values);
    navigation.navigate('ConfigPass');
  };

  return (
    <AuthTemplate
      title="找回密码"
      subtitle="为了保证您的账户安全，1天只能操作1次，否则账户将会被锁定无法登录"
      {...{ navigation }}
    >
      <FormContent onFinish={handleFinish} />
    </AuthTemplate>
  );
}
