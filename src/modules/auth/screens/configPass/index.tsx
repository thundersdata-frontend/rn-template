/**
 * 通过手机号登录时，设置登录密码
 */
import React, { FC } from 'react';
import Form, { Field, useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import { Icon, Input, WhiteSpace, Button, Box } from '@td-design/react-native';

import { passwordRules } from 'utils/validators';
import { useAuthService } from 'modules/auth/authService';
import { ErrorMessage } from 'modules/auth/components/ErrorMessage';

import { AuthTemplate } from 'modules/auth/components/AuthTemplate';
import { AppTheme } from 'theme';

const FormContent: FC<{ onFinish: (values: Store) => void }> = ({ onFinish }) => {
  const [form] = useForm();
  const theme = useTheme<AppTheme>();
  const { error, clearError, submitFormFailed } = useAuthService();

  return (
    <Form
      component={false}
      form={form}
      onFinish={onFinish}
      onFinishFailed={submitFormFailed}
      onValuesChange={clearError}
    >
      <Field name="password" rules={passwordRules}>
        <Input
          placeholder="请输入密码"
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

export function ConfigPass({ navigation }: { navigation: StackNavigationProp<AuthStackParamList> }) {
  const handleFinish = (values: Store) => {
    console.log(values);
    navigation.navigate('BindPhone');
  };

  return (
    <AuthTemplate title="设置密码" subtitle="6-20位字母和数字组合" {...{ navigation }}>
      <FormContent onFinish={handleFinish} />
    </AuthTemplate>
  );
}
