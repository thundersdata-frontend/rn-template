import { useCallback, useState } from 'react';
import { Toast } from '@td-design/react-native';
import { uploadFile } from 'utils/upload';
import { authAtom, userInfoAtom } from 'atoms';
import { useToast } from 'hooks/useToast';
import { useError } from 'hooks/useError';
import { useUpdateAtom } from 'jotai/utils';
import { signOut } from 'utils/auth';
import { mockChangeAvatar, mockFetchUserInfo, mockUpdateUsername } from 'modules/mock';

export function useUserService() {
  const updateUserInfo = useUpdateAtom(userInfoAtom);
  const updateAuth = useUpdateAtom(authAtom);
  const { toastSuccess, toastFail } = useToast();
  const { convertErrorMsg } = useError();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // 修改头像
  const changeAvatar = useCallback(
    async file => {
      try {
        Toast.submitting();
        const data = await uploadFile(file);
        const newValues = {
          profilePicture: data,
        };
        const success = await mockChangeAvatar(newValues);
        if (success) {
          updateUserInfo(draft => ({
            ...draft,
            profilePicture: data,
          }));
          toastSuccess('修改头像成功');
        }
        return data;
      } catch (error) {
        toastFail('修改头像失败');
      }
    },
    [toastFail, toastSuccess, updateUserInfo],
  );

  // 修改昵称
  const updateNickname = useCallback(
    async value => {
      if (!value) {
        toastFail('昵称输入为空');
        return;
      }
      try {
        Toast.submitting();
        const success = await mockUpdateUsername({ userName: value });
        if (success) {
          updateUserInfo(draft => ({
            ...draft,
            userName: value,
          }));
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
      const result = await mockFetchUserInfo();
      updateUserInfo(result);
      setRefreshing(false);
    } catch (error) {
      const message = convertErrorMsg(error);
      toastFail(message);
      setRefreshing(false);
      // 用户信息获取失败自动认为登录失效
      await signOut();
      updateAuth({ signedIn: false });
    }
  }, [convertErrorMsg, toastFail, updateAuth, updateUserInfo]);

  return {
    refreshing,
    changeAvatar,
    updateNickname,
    refreshUserInfo,
  };
}
