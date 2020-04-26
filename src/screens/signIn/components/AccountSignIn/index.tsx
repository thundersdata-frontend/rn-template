/*
 * @文件描述: 账号密码登录页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @LastEditors: 黄姗姗
 * @Date: 2019-04-24 15:50:09
 * @LastEditTime: 2020-04-26 16:46:55
 */
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Toast, Portal, Flex } from '@ant-design/react-native';
import { Color, Size } from '../../../../config';
import Input from '../../../../components/Input';
import GradientButton from '../../../../components/GradientButton';
import Iconfont from '../../../../components/Iconfont';
import { MAX_LENGTH_USERNAME, MAX_LENGTH_PASSWORD } from '../../../../utils/validation';
import { toastFail } from '../../../../common';
import { saveToken, saveUserInfo } from '../../../../utils/auth';
import { UserInfoInter } from '../../../../interfaces/user';
import { SignInContext } from '../../../../context/SignInContext';
import { extend } from 'umi-request';
import { AjaxResponse } from '../../../../utils/type';
import Form, { useForm, Field } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import store from '../../../../store';
import NetInfo from '@react-native-community/netinfo';

const request = extend({
  prefix: '',
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  }
});

const AccountSignIn: React.FC = () => {
  const { setSignedIn, setCheckedSignIn } = useContext(SignInContext);
  const [form] = useForm();
  const [, { setName, setToken }] = store.useModel('user');

  // eslint-disable-next-line complexity
  const handleFinish = async ({ username, password }: Store) => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      toastFail('设备未连接网络');
      return;
    }
    const key = Toast.loading('加载中', 0, () => {}, true);
    try {
      const { data, message, success } = await request.post<AjaxResponse<UserInfoInter>>('', {
        params: {
          username,
          password
        }
      });
      if (success) {
        const { token = '', name = '' } = data;
        saveToken(token);
        setToken(token);

        saveUserInfo({ name });
        setName(name);

        setSignedIn(true);
        setCheckedSignIn(true);
      } else {
        throw {
          message,
          success
        };
      }
    } catch (error) {
      toastFail(error.message || '获取数据失败');
    }
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
        <Flex style={styles.item}>
          <Iconfont style={styles.icon} name="loginAccount" size={Size.px(16)} color={Color.labelColor} />
          <Field
            name="username"
            rules={[
              { required: true, message: '请输入账号' },
              { max: 16, message: '长度不能超过16位' }
            ]}
            trigger="onChangeText"
            validateTrigger="onChangeText">
            <Input style={styles.input} placeholder={'请输入账号'} maxLength={MAX_LENGTH_USERNAME} />
          </Field>
        </Flex>
        <Flex style={styles.item}>
          <Iconfont style={styles.icon} name="loginPassword" size={Size.px(16)} color={Color.labelColor} />
          <Field
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { max: 16, message: '长度不能超过16位' }
            ]}
            trigger="onChangeText">
            <Input style={styles.input} secureTextEntry placeholder={'请输入密码'} maxLength={MAX_LENGTH_PASSWORD} />
          </Field>
        </Flex>
        <GradientButton style={styles.loginBtn} text={'登 录'} onPress={() => form.submit()} />
      </View>
    </Form>
  );
};

export default AccountSignIn;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: Size.px(15)
  },
  item: {
    height: Size.px(56),
    paddingLeft: Size.px(12),
    paddingBottom: Size.px(5),
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginBottom: Size.px(16)
  },
  icon: {
    flex: 1,
    height: Size.px(40),
    lineHeight: Size.px(40)
  },
  input: {
    flex: 9,
    fontSize: Size.px(16)
  },
  narrowInput: {
    flex: 6,
    fontSize: Size.px(16)
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
    marginTop: Size.px(60)
  }
});
