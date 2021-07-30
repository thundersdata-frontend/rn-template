/**
 * 通过手机号登录时，设置登录密码
 */
import { FC } from 'react';
import Form, { Field, useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';
import { useTheme } from '@shopify/restyle';
import { Input, WhiteSpace, Button, Box } from '@td-design/react-native';

import { passwordRules } from 'utils/validators';
import { useAuthService } from 'modules/auth/useAuthService';
import { ErrorMessage } from 'modules/auth/components/ErrorMessage';

import { AuthTemplate } from 'modules/auth/components/AuthTemplate';
import { AppTheme } from 'theme';
import { Icon } from 'components';

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
          leftIcon={<Icon name="password" color={theme.colors.icon} />}
        />
      </Field>
      <WhiteSpace size="x6" />
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
          leftIcon={<Icon name="password" color={theme.colors.icon} />}
        />
      </Field>
      <Box height={32} marginTop="x1">
        <ErrorMessage text={error} />
      </Box>
      <Button onPress={form.submit} title="确认" />
    </Form>
  );
};

export function ConfigPass() {
  const handleFinish = (values: Store) => {
    console.log(values);
  };

  return (
    <AuthTemplate title="设置密码" subtitle="6-20位字母和数字组合">
      <FormContent onFinish={handleFinish} />
    </AuthTemplate>
  );
}
