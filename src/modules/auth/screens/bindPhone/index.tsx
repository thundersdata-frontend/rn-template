/**
 * 通过手机号登录时，设置登录密码
 */
import { FC } from 'react';
import Form, { Field, useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import { Box, Button, Icon, Input, WhiteSpace, CountDown } from '@td-design/react-native';

import { AuthTemplate } from 'modules/auth/components/AuthTemplate';
import { AppTheme } from 'theme';

import { mobilePhoneRules } from 'utils/validators';
import { useAuthService } from 'modules/auth/authService';
import { ErrorMessage } from 'modules/auth/components/ErrorMessage';

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
      <Field name="phone" rules={mobilePhoneRules}>
        <Input
          placeholder="请输入手机号"
          leftIcon={<Icon type="custom" name="login_iphone" color={theme.colors.icon} />}
          allowClear
        />
      </Field>
      <WhiteSpace size="x6" />
      <Field name="sms" rules={[{ required: true, message: '请输入验证码' }]}>
        <CountDown
          bordered
          leftIcon={<Icon type="custom" name="login_verify" color={theme.colors.icon} />}
          onClick={() => console.log('123')}
          onEnd={() => console.log('倒计时结束')}
        />
      </Field>
      <Box height={32} marginTop="x1">
        <ErrorMessage text={error} />
      </Box>
      <Button onPress={form.submit} title="确认" />
    </Form>
  );
};

export function BindPhone({ navigation }: { navigation: StackNavigationProp<AuthStackParamList> }) {
  const handleFinish = (values: Store) => {
    console.log(values);
    navigation.navigate('ForgetPass');
  };

  return (
    <AuthTemplate
      title="绑定手机号"
      subtitle="绑定的手机号可以用来登录，若账号丢失或出现异常可通过绑定手机号找回密码"
      {...{ navigation }}
    >
      <FormContent onFinish={handleFinish} />
    </AuthTemplate>
  );
}
