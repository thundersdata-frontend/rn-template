/**
 * 通过手机号登录时，设置登录密码
 */
import Form, { Field, useForm } from 'rc-field-form';
import { useTheme } from '@shopify/restyle';
import { Box, Input, WhiteSpace, Button, helpers, WingBlank } from '@td-design/react-native';
import { AppTheme } from 'theme';
import { passwordPattern } from 'utils/validators';
import { ErrorMessage } from 'modules/auth/components/ErrorMessage';
import { Container, Icon } from 'components';
import { useAuthService } from 'modules/auth/useAuthService';

const { px } = helpers;

const FormContent = () => {
  const theme = useTheme<AppTheme>();
  const [form] = useForm();
  const { error, clearError, submitFormFailed, modifyPassword } = useAuthService();

  return (
    <Form
      component={false}
      form={form}
      onFinish={modifyPassword}
      onFinishFailed={submitFormFailed}
      onValuesChange={clearError}
    >
      <Field
        name="oldPassword"
        rules={[
          { required: true, message: '请输入原密码' },
          { pattern: passwordPattern, message: '原密码格式不正确, 必须包含字母数字6-20位' },
        ]}
      >
        <Input
          placeholder="请输入原密码"
          inputType="password"
          leftIcon={<Icon name="password" color={theme.colors.icon} />}
        />
      </Field>
      <WhiteSpace size="x6" />
      <Field
        name="password"
        rules={[
          { required: true, message: '请输入新密码' },
          {
            pattern: passwordPattern,
            message: '密码格式不正确，必须包含字母数字6-20位',
          },
        ]}
      >
        <Input
          placeholder="密码必须包含字母数字6-20位"
          inputType="password"
          leftIcon={<Icon name="password" color={theme.colors.icon} />}
        />
      </Field>
      <WhiteSpace size="x6" />
      <Field
        name="confirmPass"
        dependencies={['password']}
        rules={[
          { required: true, message: '请再次输入新密码' },
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
          placeholder="请再次输入新密码"
          inputType="password"
          leftIcon={<Icon name="password" color={theme.colors.icon} />}
        />
      </Field>
      <Box height={px(32)} marginTop="x1">
        <ErrorMessage text={error} />
      </Box>
      <Button onPress={form.submit} title="确认" />
    </Form>
  );
};

export function ModifyPassword() {
  return (
    <Container>
      <WhiteSpace size="x3" />
      <WingBlank size="x3">
        <FormContent />
      </WingBlank>
    </Container>
  );
}
