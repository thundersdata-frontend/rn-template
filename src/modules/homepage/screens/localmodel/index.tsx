import { Box, Button, Input, WhiteSpace } from '@td-design/react-native';
import { Container } from 'components';
import Form, { Field } from 'rc-field-form';
import useShareModelService from './useShareModelService';

export function LocalModelDemo() {
  return (
    <Container>
      <useShareModelService.Provider>
        <TestForm />
      </useShareModelService.Provider>
    </Container>
  );
}

function TestForm() {
  const { form, onFinish, onFinishFailed } = useShareModelService.useModel();
  return (
    <Box>
      <Form form={form} component={false} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名" />
        </Field>
        <WhiteSpace size="x6" />
        <PasswordInput />
      </Form>
      <Button title="提交" onPress={form.submit} />
    </Box>
  );
}

function PasswordInput() {
  const { validatePassword } = useShareModelService.useModel();
  return (
    <>
      <Field name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input inputType="password" placeholder="请输入密码" />
      </Field>
      <Button title="校验password" onPress={validatePassword} />
    </>
  );
}
