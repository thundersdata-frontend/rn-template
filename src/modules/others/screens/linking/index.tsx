import { useEffect } from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';
import { Button, Form, Input, Store, WhiteSpace } from '@td-design/react-native';

import { Container } from '@/components/Container';

const { FormItem } = Form;

export function LinkingFormDemo() {
  const route = useRoute<RouteProp<AppParamList, 'LinkingFormDemo'>>();
  const [form] = Form.useForm();

  useEffect(() => {
    const { username, password } = route.params;
    form.setFieldsValue({ username, password });
  }, [route.params]);

  const onFinish = (values: Store) => {
    console.log(values);
  };

  return (
    <Container>
      <Form form={form} onFinish={onFinish}>
        <FormItem name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名" />
        </FormItem>
        <WhiteSpace size="x6" />
        <FormItem name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input inputType="password" placeholder="请输入密码" />
        </FormItem>
        <Button title="提交" onPress={form.submit} />
      </Form>
    </Container>
  );
}
