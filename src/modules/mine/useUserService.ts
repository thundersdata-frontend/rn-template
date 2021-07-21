import { useCallback, useState } from 'react';
import { atom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { Toast } from '@td-design/react-native';
import { uploadFile } from 'utils/upload';
import { useToast } from 'hooks/useToast';
import { getUserInfo, saveUserInfo } from 'utils/auth';
import { userNamePattern } from 'utils/validators';
import { useError } from 'hooks/useError';

/** 用户信息 */
export const userInfoAtom = atom<UserInfo>({});

// TODO 将获取用户数据到atom和AsyncStorage的功能整合成一个方法
export function useUserService() {
  const updateUserInfo = useUpdateAtom(userInfoAtom);
  const { toastSuccess, toastFail } = useToast();
  const { convertErrorMsg } = useError();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // 修改头像
  const changeAvatar = useCallback(
    async file => {
      try {
        Toast.submitting();
        const data = await uploadFile(file);
        const userInfo = await getUserInfo();
        // 调用后台更新头像接口
        const success = true;
        if (success) {
          const userInfoData = {
            ...userInfo,
            profilePicture: data,
          };
          saveUserInfo(userInfoData);
          updateUserInfo(userInfoData);
          toastSuccess('修改头像成功');
        }
        return data;
      } catch (error) {
        toastFail('修改头像失败');
      }
    },
    [toastFail, toastSuccess, updateUserInfo],
  );

  // 修改用户名
  const updateNickname = useCallback(
    async value => {
      if (!value) {
        toastFail('用户名输入为空');
        return;
      }
      if (!userNamePattern.test(value)) {
        toastFail('用户名不符合规范');
        return;
      }
      try {
        Toast.submitting();
        // 调用后台修改昵称的接口
        const success = true;
        if (success) {
          const userInfo = await getUserInfo();
          const userInfoData = {
            ...userInfo,
            userName: value,
          };
          saveUserInfo(userInfoData);
          updateUserInfo(userInfoData);
          toastSuccess('修改昵称成功');
        }
      } catch (error) {
        toastFail('修改昵称失败');
      }
    },
    [toastFail, toastSuccess, updateUserInfo],
  );

  /** 下拉刷新更新用户状态 */
  const refreshUserInfo = useCallback(async () => {
    try {
      setRefreshing(true);
      // 调用后台获取用户数据的接口
      const result = {};
      saveUserInfo(result);
      updateUserInfo(result);
      setRefreshing(false);
    } catch (error) {
      const message = convertErrorMsg(error);
      toastFail(message);
      setRefreshing(false);
    }
  }, [convertErrorMsg, toastFail, updateUserInfo]);

  return {
    refreshing,
    changeAvatar,
    updateNickname,
    refreshUserInfo,
  };
}
