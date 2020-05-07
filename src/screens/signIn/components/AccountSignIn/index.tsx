/*
 * @文件描述: 账号密码登录页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @LastEditors: 黄姗姗
 * @Date: 2019-04-24 15:50:09
 * @LastEditTime: 2020-05-07 10:03:29
 */
import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Toast, Portal, Flex, Button } from '@ant-design/react-native';
import { Color, Size } from '../../../../config';
import Input from '../../../../components/Input';
import Iconfont from '../../../../components/Iconfont';
import { MAX_LENGTH_USERNAME, MAX_LENGTH_PASSWORD } from '../../../../utils/validation';
import { toastFail } from '../../../../common';
import { SignInContext } from '../../../../context/SignInContext';
import Form, { useForm, Field } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

const { px } = Size;

const AccountSignIn: React.FC = () => {
  const { setSignedIn, setCheckedSignIn } = useContext(SignInContext);
  const [form] = useForm();
  const navigation = useNavigation();

  // eslint-disable-next-line complexity
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
    <Form component={false} onFinish={handleFinish} onFinishFailed={handleFinishFailed} form={form}>
      <View style={styles.content}>
        <Flex style={[styles.item, { marginBottom: px(20) }]}>
          <Iconfont style={styles.icon} name="loginAccount" size={Size.px(16)} />
          <Field
            name="username"
            rules={[
              { required: true, message: '请输入账号' },
              { max: MAX_LENGTH_USERNAME, message: `长度不能超过${MAX_LENGTH_USERNAME}位` }
            ]}
            trigger="onChangeText"
            validateTrigger="onChangeText">
            <Input style={styles.input} placeholder="请输入账号" maxLength={MAX_LENGTH_USERNAME} />
          </Field>
        </Flex>
        <Flex style={styles.item}>
          <Iconfont style={styles.icon} name="loginPassword" size={Size.px(16)} />
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
        <Text
          onPress={() => navigation.navigate('ForgetPassword')}
          style={[styles.text, { color: Color.primary, textAlign: 'right' }]}>
          忘记密码
        </Text>
        <Button type="primary" style={styles.loginBtn} onPress={() => form.submit()}>
          登 录
        </Button>
        <Text style={[styles.text, { textAlign: 'center' }]}>
          没有账号，去
          <Text onPress={() => navigation.navigate('Register')} style={[styles.text, { color: Color.primary }]}>
            注册
          </Text>
        </Text>
      </View>
    </Form>
  );
};

export default AccountSignIn;

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
    marginBottom: Size.px(10)
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
  loginBtn: {
    marginTop: Size.px(40),
    marginBottom: px(20)
  }
});
