import { type File, Toast } from '@td-design/react-native';
import { useMemoizedFn } from '@td-design/rn-hooks';
import { useSetAtom } from 'jotai';

import { userInfoAtom } from '@/atoms';
import { useCustomRequest } from '@/hooks/useCustomRequest';
import { useNotify } from '@/hooks/useNotify';
import { mockChangeAvatar, mockFetchUserInfo, mockUpdateUsername } from '@/modules/mock';

export function useUserService() {
  const { successNotify, failNotify } = useNotify();
  const updateUserInfo = useSetAtom(userInfoAtom);

  const { run: _changeAvatar } = useCustomRequest(mockChangeAvatar, {
    onBefore() {
      Toast.process('提交中...');
    },
    onSuccess(_, params) {
      updateUserInfo({
        profilePicture: params[0]?.profilePicture,
      });
      successNotify('修改头像成功');
    },
    onError() {
      failNotify('修改头像失败');
    },
    onFinally() {
      Toast.hide();
    },
  });

  const { run: _updateNickname } = useCustomRequest(mockUpdateUsername, {
    onBefore() {
      Toast.process('提交中...');
    },
    onSuccess(_, params) {
      updateUserInfo({
        userName: params[0]?.userName,
      });
      successNotify('修改昵称成功');
    },
    onError() {
      failNotify('修改昵称失败');
    },
    onFinally() {
      Toast.hide();
    },
  });

  const { loading: refreshing, refresh: refreshUserInfo } = useCustomRequest(mockFetchUserInfo, {
    queryKey: ['fetchUserInfo'],
    enabled: false,
    onSuccess(data) {
      updateUserInfo(data);
    },
  });

  // 修改头像
  const changeAvatar = async (file: File) => {
    const newValues = {
      profilePicture: file.uri,
    };
    _changeAvatar(newValues);
  };

  // 修改昵称
  const updateNickname = async (value?: string) => {
    if (!value) {
      failNotify('昵称输入为空');
      return;
    }
    _updateNickname({ userName: value });
  };

  return {
    refreshing,
    changeAvatar: useMemoizedFn(changeAvatar),
    updateNickname: useMemoizedFn(updateNickname),
    refreshUserInfo: useMemoizedFn(refreshUserInfo),
  };
}
