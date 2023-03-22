import { Box, Button, Form, Input, WhiteSpace } from '@td-design/react-native';

import { Container } from '@/components/Container';

import useShareModelService from './useShareModelService';

const { FormItem } = Form;
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
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <FormItem name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名" />
        </FormItem>
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
      <FormItem name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input inputType="password" placeholder="请输入密码" />
      </FormItem>
      <Button title="校验password" onPress={validatePassword} />
    </>
  );
}
