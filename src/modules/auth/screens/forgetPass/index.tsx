/**
 * 通过手机号登录时，设置登录密码
 */
import React, { FC } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Form, { Field, useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/es/interface';

import AuthTemplate from 'modules/auth/components/AuthTemplate';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';

const FormContent: FC<{ onFinish: (values: Store) => void }> = ({ onFinish }) => {
  const [form] = useForm();

  return (
    <Form component={false} form={form} onFinish={onFinish}>
      <Field name="phone" trigger="onChangeText">
        <TextInput
          placeholder="请输入手机号"
          style={{ borderWidth: 1, borderColor: '#e5e5e5', height: 48, marginBottom: 24 }}
        />
      </Field>
      <Field name="sms" trigger="onChangeText">
        <TextInput
          placeholder="请输入验证码"
          style={{ borderWidth: 1, borderColor: '#e5e5e5', height: 48, marginBottom: 24 }}
        />
      </Field>
      <Field name="sms" trigger="onChangeText">
        <TextInput
          placeholder="请输入新密码"
          style={{ borderWidth: 1, borderColor: '#e5e5e5', height: 48, marginBottom: 24 }}
        />
      </Field>
      <Field name="sms" trigger="onChangeText">
        <TextInput
          placeholder="请再次确认密码"
          style={{ borderWidth: 1, borderColor: '#e5e5e5', height: 48, marginBottom: 24 }}
        />
      </Field>
      <TouchableOpacity onPress={form.submit} style={styles.btn}>
        <Text style={{ fontSize: 18, lineHeight: 22, color: '#fff', fontWeight: '500' }}>确认</Text>
      </TouchableOpacity>
    </Form>
  );
};

export default function ForgetPass({ navigation }: { navigation: NativeStackNavigationProp<AuthStackParamList> }) {
  const handleFinish = (values: Store) => {
    console.log(values);
  };

  return (
    <AuthTemplate
      title="找回密码"
      subtitle="为了保证您的账户安全，1天只能操作1次，否则账户将会被锁定无法登录"
      {...{ navigation }}>
      <FormContent onFinish={handleFinish} />
    </AuthTemplate>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#3171F0',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
