import { useCallback, useState } from 'react';
import { atom } from 'jotai';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
import { Keyboard } from 'react-native';
import { useToast } from 'hooks/useToast';
import { useError } from 'hooks/useError';

/** 是否登录 */
export const authAtom = atom({
  signedIn: false,
});

export function useAuthService(isSmsLogin = true) {
  const { convertErrorMsg } = useError();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { toastFail, toastSuccess } = useToast();

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

  /** 验证码登录 */
  const smsLogin = useCallback(
    async values => {
      try {
        console.log(values);
      } catch (error) {
        setLoading(false);
        const message = convertErrorMsg(error);
        setError(message);
      }
    },
    [convertErrorMsg],
  );

  /** 用户名密码登录 */
  const login = useCallback(
    async values => {
      try {
        console.log(values);
      } catch (error) {
        setLoading(false);
        const message = convertErrorMsg(error);
        setError(message);
      }
    },
    [convertErrorMsg],
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

  /** 修改密码 */
  const changePassword = useCallback(
    async values => {
      try {
        Keyboard.dismiss();
        // 调用后台修改密码接口
        console.log(values);
        const data = true;
        if (!data) {
          toastFail('修改密码失败');
        }
      } catch (error) {
        const message = convertErrorMsg(error);
        setError(message);
      }
    },
    [convertErrorMsg, toastFail],
  );

  /** 重置密码 */
  const forgetPassword = useCallback(
    async values => {
      try {
        Keyboard.dismiss();
        console.log(values);
      } catch (error) {
        const message = convertErrorMsg(error);
        setError(message);
      }
    },
    [convertErrorMsg],
  );

  /** 发送验证码之前的校验 */
  const beforeSendSms = useCallback(
    (phone: string) => {
      if (!phone) {
        toastFail('手机号为空');
        return Promise.resolve(false);
      } else if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(phone)) {
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
        console.log(values);
      } catch (error) {
        const message = convertErrorMsg(error);
        setError(message);
      }
    },
    [convertErrorMsg],
  );

  /**
   * 注册
   */
  const register = useCallback(
    async (values: Store) => {
      try {
        Keyboard.dismiss();
        console.log(values);
        toastSuccess('恭喜你，注册成功');
      } catch (error) {
        setLoading(false);
        const message = convertErrorMsg(error);
        setError(message);
      }
    },
    [convertErrorMsg, toastSuccess],
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
    beforeSendSms,
    smsSend,
    changePassword,
    forgetPassword,
    register,
  };
}
