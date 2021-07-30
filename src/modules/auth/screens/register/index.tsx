/**
 * 注册页面
 */
import Form, { Field, useForm } from 'rc-field-form';
import { useTheme } from '@shopify/restyle';
import { Box, Button, Input, WhiteSpace, CountDown } from '@td-design/react-native';

import { AuthTemplate } from 'modules/auth/components/AuthTemplate';
import { AppTheme } from 'theme';

import { mobilePhoneRules, passwordRules } from 'utils/validators';
import { useAuthService } from 'modules/auth/useAuthService';
import { ErrorMessage } from 'modules/auth/components/ErrorMessage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SmsTypeEnum } from 'enums';
import { Icon } from 'components';

const FormContent = () => {
  const [form] = useForm();
  const theme = useTheme<AppTheme>();
  const { error, clearError, loading, beforeSendSms, smsSend, submitFormFailed, register } = useAuthService();

  return (
    <Form
      component={false}
      form={form}
      onFinish={register}
      onFinishFailed={submitFormFailed}
      onValuesChange={clearError}
    >
      <Field
        name="username"
        rules={[
          { required: true, message: '请输入用户名' },
          { pattern: /^[a-z0-9A-Z0-9\-\_@]+$/, message: '用户名格式不正确' },
        ]}
      >
        <Input placeholder="请输入用户名" leftIcon={<Icon name="user" color={theme.colors.icon} />} allowClear />
      </Field>
      <WhiteSpace size="x6" />
      <Field name="phone" rules={mobilePhoneRules}>
        <Input placeholder="请输入手机号" leftIcon={<Icon name="mobile" color={theme.colors.icon} />} allowClear />
      </Field>
      <WhiteSpace size="x6" />
      <Field name="code" rules={[{ required: true, message: '请输入验证码' }]}>
        <CountDown
          bordered
          leftIcon={<Icon name="sms" color={theme.colors.icon} />}
          onBeforeSend={() => beforeSendSms(form.getFieldValue('phone'))}
          onSend={() => smsSend({ mobile: form.getFieldValue('phone'), type: SmsTypeEnum.注册 })}
        />
      </Field>
      <WhiteSpace size="x6" />
      <Field name="password" rules={passwordRules}>
        <Input
          placeholder="请输入密码"
          inputType="password"
          leftIcon={<Icon name="password" color={theme.colors.icon} />}
        />
      </Field>
      <WhiteSpace size="x6" />
      <Field
        name="againPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: '请再次输入密码' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码格式不正确' },
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
      <Button loading={loading} onPress={form.submit} title="确认" />
    </Form>
  );
};

export function Register() {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  return (
    <AuthTemplate title="注册" subtitle="注册账号后才允许使用App" {...{ navigation }}>
      <FormContent />
    </AuthTemplate>
  );
}
