import React, { useContext } from 'react';
import Container from '../../../components/Container';
import { Text, ImageBackground, Image, Platform, View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Flex, Toast, Portal, Button, Icon } from '@ant-design/react-native';
import { Size, Color } from '../../../config';
import { ValidateErrorEntity, Store } from 'rc-field-form/lib/interface';
import { toastFail } from '../../../common';
import Input from '@ant-design/react-native/lib/input-item/Input';
import { MAX_LENGTH_USERNAME, MAX_LENGTH_PASSWORD } from '../../../utils/validation';
import NetInfo from '@react-native-community/netinfo';
import { SignInContext } from '../../../context/SignInContext';
import Form, { useForm, Field } from 'rc-field-form';
import Iconfont from '../../../components/Iconfont';
import { useNavigation } from '@react-navigation/native';
import useSmsSend from '../../../hooks/useSmsSend';
import { phoneReg } from '../../../utils/regex-utils';

const { px } = Size;

const Register = () => {
  const { setSignedIn, setCheckedSignIn } = useContext(SignInContext);
  const [form] = useForm();
  const navigation = useNavigation();

  const { smsText, sendSms } = useSmsSend();

  const handleFinish = async ({ username, password }: Store) => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      toastFail('设备未连接网络');
      return;
    }
    console.log(username, password);
    const key = Toast.loading('加载中', 0, () => {}, true);
    setSignedIn(true);
    setCheckedSignIn(true);
    Portal.remove(key);
  };

  const handleFinishFailed = ({ errorFields }: ValidateErrorEntity) => {
    if (errorFields.length > 0) {
      toastFail(errorFields[0].errors[0]);
    }
  };

  return (
    <Container style={{ marginTop: 0 }}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
        enableOnAndroid
        extraHeight={Platform.select({ android: 190, ios: 170 })}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always" // 解决键盘关闭后点击登录无反应，需要再点一次的问题
      >
        <ImageBackground
          source={require('../../../images/pic_login_bg.png')}
          style={{ width: Size.DEVICE_WIDTH, flex: 1 }}
          resizeMode="stretch">
          <Flex align="center" justify="center" style={{ flex: 1 }}>
            <Image
              source={require('../../../images/pic_login_logo.png')}
              style={{ width: px(180), height: px(180) }}
              resizeMode="contain"
            />
          </Flex>
          <Form component={false} onFinish={handleFinish} onFinishFailed={handleFinishFailed} form={form}>
            <View style={styles.content}>
              <Flex style={styles.item}>
                <Iconfont style={styles.icon} name="loginAccount" size={Size.px(16)} />
                <Field
                  name="username"
                  trigger="onChangeText"
                  validateTrigger="onChangeText"
                  rules={[
                    { required: true, message: '请输入账号' },
                    { max: MAX_LENGTH_USERNAME, message: `长度不能超过${MAX_LENGTH_USERNAME}位` }
                  ]}>
                  <Input style={styles.input} placeholder="请输入账号" maxLength={MAX_LENGTH_USERNAME} />
                </Field>
              </Flex>
              <Flex style={styles.item}>
                <Iconfont style={styles.icon} name="loginPassword" size={Size.px(16)} />
                <Field
                  name="password"
                  trigger="onChangeText"
                  validateTrigger="onChangeText"
                  rules={[
                    { required: true, message: '请输入密码' },
                    { max: MAX_LENGTH_PASSWORD, message: `长度不能超过${MAX_LENGTH_PASSWORD}位` }
                  ]}>
                  <Input
                    style={styles.input}
                    secureTextEntry
                    placeholder="请输入密码"
                    maxLength={MAX_LENGTH_PASSWORD}
                  />
                </Field>
              </Flex>
              <Flex style={[styles.item, { marginBottom: px(20) }]}>
                <Icon style={styles.icon} name="mobile" size={Size.px(16)} />
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
                <Iconfont style={styles.icon} name="loginPassword" size={Size.px(16)} />
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
              <Button type="primary" style={styles.loginBtn} onPress={() => form.submit()}>
                注册并登录
              </Button>
              <Text style={[styles.text, { textAlign: 'center' }]}>
                已有账号，去
                <Text onPress={() => navigation.navigate('SignIn')} style={[styles.text, { color: Color.primary }]}>
                  登录
                </Text>
              </Text>
            </View>
          </Form>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: Size.px(24)
  },
  item: {
    height: Size.px(44),
    paddingLeft: Size.px(12),
    borderRadius: px(4),
    backgroundColor: Color.backgroundColor,
    marginBottom: Size.px(20)
  },
  icon: {
    flex: 1,
    height: Size.px(40),
    lineHeight: Size.px(40),
    color: Color.primary
  },
  input: {
    flex: 9,
    fontSize: Size.px(16),
    color: Color.mainTextColor
  },
  text: {
    fontSize: px(14),
    fontWeight: '400',
    color: Color.middleTextColor
  },
  extraText: {
    flex: 3,
    textAlign: 'right',
    color: Color.primary,
    paddingRight: Size.px(10),
    fontSize: Size.px(12),
    height: Size.px(40),
    lineHeight: Size.px(40)
  },
  loginBtn: {
    marginTop: Size.px(40),
    marginBottom: px(20)
  }
});

export default Register;
