import { Toast } from '@td-design/react-native';
import { File } from '@td-design/react-native-image-picker';
import { useMemoizedFn } from '@td-design/rn-hooks';

import { useCustomRequest } from '@/hooks/useCustomRequest';
import { useError } from '@/hooks/useError';
import { useNotify } from '@/hooks/useNotify';
import useUpdateService from '@/hooks/useUpdateService';
import { mockChangeAvatar, mockFetchUserInfo, mockUpdateUsername } from '@/modules/mock';
import { storageService, StorageToken } from '@/services/StorageService';
import { uploadFile } from '@/utils/upload';

export function useUserService() {
  const { update } = useUpdateService.useModel();
  const { successNotify, failNotify } = useNotify();
  const { convertErrorMsg } = useError();
  const { signOut, updateStorage } = storageService;

  const { runAsync: _changeAvatar } = useCustomRequest(mockChangeAvatar, {
    manual: true,
    onBefore() {
      Toast.process('提交中...');
    },
    onSuccess(_, params) {
      updateStorage(StorageToken.UserInfo, {
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
      updateStorage(StorageToken.UserInfo, {
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
      updateStorage(StorageToken.UserInfo, data);
    },
    onError(error) {
      const message = convertErrorMsg(error);
      failNotify(message);
    },
  });

  // 修改头像
  const changeAvatar = async (file: File) => {
    const data = await uploadFile(file);
    const newValues = {
      profilePicture: data,
    };
    await _changeAvatar(newValues);
    return data;
  };

  // 修改昵称
  const updateNickname = async (value?: string) => {
    if (!value) {
      failNotify('昵称输入为空');
      return;
    }
    _updateNickname({ userName: value });
  };

  /** 退出登录 */
  const logout = () => {
    signOut();
    update();
  };

  return {
    refreshing,
    signOut: useMemoizedFn(logout),
    changeAvatar: useMemoizedFn(changeAvatar),
    updateNickname: useMemoizedFn(updateNickname),
    refreshUserInfo: useMemoizedFn(refreshUserInfo),
  };
}
