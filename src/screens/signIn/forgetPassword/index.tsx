import React from 'react';
import Container from '../../../components/Container';
import { Text, StyleSheet } from 'react-native';
import Form, { useForm, Field } from 'rc-field-form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { toastFail, toastSuccess } from '../../../common';
import { Flex, Button, WingBlank, WhiteSpace } from '@ant-design/react-native';
import Input from '../../../components/Input';
import { Size, Color } from '../../../config';
import useSmsSend from '../../../hooks/useSmsSend';
import ListItemText from '../../../components/ListItemText';
import { MAX_LENGTH_PASSWORD } from '../../../utils/validation';
import { ScrollView } from 'react-native-gesture-handler';
import { phoneReg } from '../../../utils/regex-utils';
import { useNavigation } from '@react-navigation/native';

const ForgetPassword = () => {
  const [form] = useForm();
  const { smsText, sendSms } = useSmsSend();
  const navigation = useNavigation();

  const handleFinish = () => {
    toastSuccess('密码重置成功');
    navigation.navigate('SignIn');
  };

  const handleFinishFailed = ({ errorFields }: ValidateErrorEntity) => {
    if (errorFields.length > 0) {
      toastFail(errorFields[0].errors[0]);
    }
  };

  return (
    <Container>
      <ScrollView>
        <Form component={false} onFinish={handleFinish} onFinishFailed={handleFinishFailed} form={form}>
          <Flex style={styles.item}>
            <ListItemText style={{ flex: 2 }} text="手机号" />
            <Field
              name="phone"
              trigger="onChangeText"
              validateTrigger="onChangeText"
              rules={[
                { required: true, message: '请输入手机号' },
                {
                  pattern: phoneReg,
                  message: '请输入正确的手机号'
                }
              ]}>
              <Input style={styles.input} placeholder="请输入手机号" />
            </Field>
          </Flex>
          <Flex style={styles.item}>
            <ListItemText style={{ flex: 2 }} text="验证码" />
            <Flex style={{ flex: 9 }}>
              <Field
                name="code"
                trigger="onChangeText"
                validateTrigger="onChangeText"
                rules={[{ required: true, message: '请输入验证码' }]}>
                <Input style={styles.input} placeholder="请输入验证码" />
              </Field>
              <Text style={styles.extraText} onPress={() => sendSms(form.getFieldValue('phone'))}>
                {smsText}
              </Text>
            </Flex>
          </Flex>
          <Flex style={styles.item}>
            <ListItemText style={{ flex: 2 }} text="重置密码" />
            <Field
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { max: MAX_LENGTH_PASSWORD, message: `长度不能超过${MAX_LENGTH_PASSWORD}位` }
              ]}
              trigger="onChangeText">
              <Input style={styles.input} secureTextEntry placeholder="请输入密码" maxLength={MAX_LENGTH_PASSWORD} />
            </Field>
          </Flex>
        </Form>
      </ScrollView>
      <WingBlank>
        <WhiteSpace />
        <Button type="primary" onPress={() => form.submit()}>
          确认重置
        </Button>
        <WhiteSpace />
      </WingBlank>
    </Container>
  );
};

const styles = StyleSheet.create({
  item: {
    height: Size.px(44),
    paddingLeft: Size.px(12),
    borderBottomWidth: Size.ONE_PIXEL,
    borderBottomColor: Color.borderColor
  },
  input: {
    flex: 9,
    fontSize: Size.px(16),
    color: Color.mainTextColor
  },
  extraText: {
    flex: 3,
    textAlign: 'right',
    color: Color.primary,
    paddingRight: Size.px(10),
    fontSize: Size.px(12),
    height: Size.px(40),
    lineHeight: Size.px(40)
  }
});

export default ForgetPassword;
