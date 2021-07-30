import { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
import { useUpdateAtom } from 'jotai/utils';

import { authAtom, tokenAtom, userInfoAtom } from 'atoms';
import { useToast } from 'hooks/useToast';
import { useError } from 'hooks/useError';
import {
  mockConfigPassword,
  mockFetchUserInfo,
  mockLogin,
  mockRegister,
  mockResetPassword,
  mockSendSms,
  mockUpdatePassword,
} from 'modules/mock';
import { useNavigation } from '@react-navigation/native';
import { mobilePattern } from 'utils/validators';
import { signOut } from 'utils/auth';

export function useAuthService(isSmsLogin = true) {
  const navigation = useNavigation();
  const { convertErrorMsg } = useError();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { toastFail, toastSuccess } = useToast();

  const updateAuth = useUpdateAtom(authAtom);
  const updateUserInfo = useUpdateAtom(userInfoAtom);
  const updateToken = useUpdateAtom(tokenAtom);

  const submitFormFailed = useCallback((errorInfo: ValidateErrorEntity) => {
    const { errorFields } = errorInfo;
    if (errorFields.length > 0) {
      const error = errorFields[0];
      const { errors } = error;
      setError(errors[0]);
    }
  }, []);

  /**
   * 表单数据发生变化的时候执行这个方法
   */
  const handleFormValueChange = useCallback(
    (_: Record<string, string>, values: Store) => {
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
    },
    [isSmsLogin],
  );

  const clearError = useCallback(() => {
    setError('');
  }, []);

  /** 查询用户信息 */
  const fetchUserInfo = useCallback(async () => {
    try {
      const userInfo = await mockFetchUserInfo();
      updateUserInfo(userInfo);
      updateAuth({ signedIn: true });
    } catch (error) {
      const message = convertErrorMsg(error);
      toastFail(message);
    }
  }, [convertErrorMsg, toastFail, updateAuth, updateUserInfo]);

  /** 验证码登录 */
  const smsLogin = useCallback(
    async values => {
      try {
        setLoading(true);
        const data = await mockLogin(values);
        if (data) {
          const { ispassword } = data;
          updateToken(data);
          await fetchUserInfo();
          setLoading(false);
          if (!!ispassword) {
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
    },
    [convertErrorMsg, fetchUserInfo, navigation, updateToken],
  );

  /** 用户名密码登录 */
  const login = useCallback(
    async values => {
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
    },
    [convertErrorMsg, fetchUserInfo, updateToken],
  );

  /** 登录表单提交 */
  const handleFinish = useCallback(
    async (values: Store) => {
      Keyboard.dismiss();
      if (isSmsLogin) {
        smsLogin(values);
      } else {
        login(values);
      }
    },
    [isSmsLogin, login, smsLogin],
  );

  /** 注册之后设置密码 */
  const configPassword = useCallback(
    async values => {
      try {
        Keyboard.dismiss();
        const data = await mockConfigPassword(values);
        if (data) {
          updateAuth({ signedIn: true });
        } else {
          setError('对不起，设置密码失败');
        }
      } catch (error) {
        const message = convertErrorMsg(error);
        setError(message);
      }
    },
    [convertErrorMsg, updateAuth],
  );

  /** 重置密码 */
  const forgetPassword = useCallback(
    async values => {
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
    },
    [convertErrorMsg, navigation],
  );

  /** 修改密码 */
  const modifyPassword = useCallback(
    async values => {
      try {
        Keyboard.dismiss();
        const data = await mockUpdatePassword(values);
        if (data) {
          navigation.navigate('ModifyPasswordResult');
        } else {
          toastFail('修改密码失败');
        }
      } catch (error) {
        const message = convertErrorMsg(error);
        toastFail(message);
      }
    },
    [convertErrorMsg, navigation, toastFail],
  );

  /** 发送验证码之前的校验 */
  const beforeSendSms = useCallback(
    (phone: string) => {
      if (!phone) {
        toastFail('手机号为空');
        return Promise.resolve(false);
      } else if (!mobilePattern.test(phone)) {
        toastFail('手机号格式不正确');
        return Promise.resolve(false);
      }
      return Promise.resolve(true);
    },
    [toastFail],
  );

  /** 发送验证码 */
  const smsSend = useCallback(
    async values => {
      try {
        Keyboard.dismiss();
        await mockSendSms(values);
      } catch (error) {
        const message = convertErrorMsg(error);
        setError(message);
      }
    },
    [convertErrorMsg],
  );

  /** 退出登录 */
  const signedOut = useCallback(() => {
    signOut().then(() => {
      updateAuth({ signedIn: false });
    });
  }, [updateAuth]);

  /**
   * 注册
   */
  const register = useCallback(
    async (values: Store) => {
      try {
        Keyboard.dismiss();
        setLoading(true);
        await mockRegister(values);
        setLoading(false);
        toastSuccess('恭喜你，注册成功');
        navigation.navigate('SignIn'); // 注册成功后去登录页面登录
      } catch (error) {
        setLoading(false);
        const message = convertErrorMsg(error);
        setError(message);
      }
    },
    [convertErrorMsg, navigation, toastSuccess],
  );

  return {
    disabled,
    loading,
    error,
    clearError,
    setError,
    handleFinish,
    submitFormFailed,
    handleFormValueChange,
    signedOut,
    beforeSendSms,
    smsSend,
    configPassword,
    forgetPassword,
    modifyPassword,
    register,
  };
}
