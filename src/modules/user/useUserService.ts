import { Toast } from '@td-design/react-native';
import { useMemoizedFn } from '@td-design/rn-hooks';
import { useSetAtom } from 'jotai';

import { userInfoAtom } from '@/atoms';
import { useCustomRequest } from '@/hooks/useCustomRequest';
import { useError } from '@/hooks/useError';
import { useNotify } from '@/hooks/useNotify';
import { mockChangeAvatar, mockFetchUserInfo, mockUpdateUsername } from '@/modules/mock';

// import { uploadFile } from '@/utils/upload';

export function useUserService() {
  const { successNotify, failNotify } = useNotify();
  const { convertErrorMsg } = useError();
  const updateUserInfo = useSetAtom(userInfoAtom);

  const { runAsync: _changeAvatar } = useCustomRequest(mockChangeAvatar, {
    manual: true,
    onBefore() {
      Toast.process('提交中...');
    },
    onSuccess(_, params) {
      updateUserInfo({
        profilePicture: params[0].profilePicture,
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
    manual: true,
    onBefore() {
      Toast.process('提交中...');
    },
    onSuccess(_, params) {
      updateUserInfo({
        userName: params[0].userName,
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

  const { loading: refreshing, run: refreshUserInfo } = useCustomRequest(mockFetchUserInfo, {
    manual: true,
    onSuccess(data) {
      updateUserInfo(data);
    },
    onError(error) {
      const message = convertErrorMsg(error);
      failNotify(message);
    },
  });

  // 修改头像
  const changeAvatar = async (file: File) => {
    // const data = await uploadFile(file);
    const newValues = {
      profilePicture: file.uri,
    };
    await _changeAvatar(newValues);
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
