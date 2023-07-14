import { Keyboard } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import type { Store, ValidateErrorEntity } from '@td-design/react-native';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { useSetAtom } from 'jotai';

import { signedInAtom, tokenAtom, userInfoAtom } from '@/atoms';
import { useError } from '@/hooks/useError';
import { useNotify } from '@/hooks/useNotify';
import {
  mockConfigPassword,
  mockFetchUserInfo,
  mockLogin,
  mockRegister,
  mockResetPassword,
  mockSendSms,
  mockUpdatePassword,
} from '@/modules/mock';
import { mobilePattern } from '@/utils/validators';

export function useAuthService(isSmsLogin = true) {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { convertErrorMsg } = useError();
  const { failNotify, successNotify } = useNotify();

  const updateUserInfo = useSetAtom(userInfoAtom);
  const updateSignedIn = useSetAtom(signedInAtom);
  const updateToken = useSetAtom(tokenAtom);

  const [error, setError] = useSafeState('');
  const [loading, setLoading] = useSafeState(false);
  const [disabled, setDisabled] = useSafeState(true);

  const submitFormFailed = (errorInfo: ValidateErrorEntity) => {
    const { errorFields } = errorInfo;
    if (errorFields.length > 0) {
      const error = errorFields[0];
      const { errors } = error;
      setError(errors[0]);
    }
  };

  /**
   * 表单数据发生变化的时候执行这个方法
   */
  const handleFormValueChange = (_: Record<string, string>, values: Store) => {
    const { username, phone, sms, password } = values;
    if (isSmsLogin) {
      if (phone && sms) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      if (username && password) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  };

  const clearError = () => {
    setError('');
  };

  /** 查询用户信息 */
  const fetchUserInfo = async () => {
    try {
      const userInfo = await mockFetchUserInfo();
      updateUserInfo(userInfo);
      updateSignedIn(true);
    } catch (error) {
      const message = convertErrorMsg(error);
      failNotify(message);
    }
  };

  /** 验证码登录 */
  const smsLogin = async (values: Store) => {
    try {
      setLoading(true);
      const data = await mockLogin(values);
      if (data) {
        const { ispassword } = data;
        updateToken(data);
        await fetchUserInfo();
        setLoading(false);
        if (ispassword) {
          navigation.navigate('ConfigPass');
        }
      } else {
        setLoading(false);
        setError('对不起，登录失败');
      }
    } catch (error) {
      setLoading(false);
      const message = convertErrorMsg(error);
      setError(message);
    }
  };

  /** 用户名密码登录 */
  const login = async (values: Store) => {
    try {
      setLoading(true);
      const data = await mockLogin(values);
      if (data) {
        updateToken(data);
        await fetchUserInfo();
        setLoading(false);
      } else {
        setLoading(false);
        setError('对不起，登录失败');
      }
    } catch (error) {
      setLoading(false);
      const message = convertErrorMsg(error);
      setError(message);
    }
  };

  /** 登录表单提交 */
  const handleFinish = async (values: Store) => {
    Keyboard.dismiss();
    if (isSmsLogin) {
      smsLogin(values);
    } else {
      login(values);
    }
  };

  /** 注册之后设置密码 */
  const configPassword = async (values: Store) => {
    try {
      Keyboard.dismiss();
      const data = await mockConfigPassword(values);
      if (data) {
        updateSignedIn(true);
      } else {
        setError('对不起，设置密码失败');
      }
    } catch (error) {
      const message = convertErrorMsg(error);
      setError(message);
    }
  };

  /** 重置密码 */
  const forgetPassword = async (values: Store) => {
    try {
      Keyboard.dismiss();
      const data = await mockResetPassword(values);
      if (data) {
        navigation?.canGoBack() && navigation.goBack();
      } else {
        setError('对不起，重置密码失败');
      }
    } catch (error) {
      const message = convertErrorMsg(error);
      setError(message);
    }
  };

  /** 修改密码 */
  const modifyPassword = async (values: Store) => {
    try {
      Keyboard.dismiss();
      const data = await mockUpdatePassword(values);
      if (data) {
        navigation.navigate('ModifyPasswordResult');
      } else {
        failNotify('修改密码失败');
      }
    } catch (error) {
      const message = convertErrorMsg(error);
      failNotify(message);
    }
  };

  /** 发送验证码之前的校验 */
  const beforeSendSms = (phone: string) => {
    if (!phone) {
      failNotify('手机号为空');
      return Promise.resolve(false);
    } else if (!mobilePattern.test(phone)) {
      failNotify('手机号格式不正确');
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  };

  /** 发送验证码 */
  const smsSend = async (values: Store) => {
    try {
      Keyboard.dismiss();
      await mockSendSms(values);
    } catch (error) {
      const message = convertErrorMsg(error);
      setError(message);
    }
  };

  /**
   * 注册
   */
  const register = async (values: Store) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      await mockRegister(values);
      setLoading(false);
      successNotify('恭喜你，注册成功');
      navigation.navigate('SignIn'); // 注册成功后去登录页面登录
    } catch (error) {
      setLoading(false);
      const message = convertErrorMsg(error);
      setError(message);
    }
  };

  return {
    disabled,
    loading,
    error,
    clearError: useMemoizedFn(clearError),
    setError: useMemoizedFn(setError),
    handleFinish: useMemoizedFn(handleFinish),
    submitFormFailed: useMemoizedFn(submitFormFailed),
    handleFormValueChange: useMemoizedFn(handleFormValueChange),
    beforeSendSms: useMemoizedFn(beforeSendSms),
    smsSend: useMemoizedFn(smsSend),
    configPassword: useMemoizedFn(configPassword),
    forgetPassword: useMemoizedFn(forgetPassword),
    modifyPassword: useMemoizedFn(modifyPassword),
    register: useMemoizedFn(register),
  };
}
