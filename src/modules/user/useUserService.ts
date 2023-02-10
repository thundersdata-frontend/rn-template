import { useError } from '@/hooks/useError';
import { useNotify } from '@/hooks/useNotify';
import { mockChangeAvatar, mockFetchUserInfo, mockUpdateUsername } from '@/modules/mock';
import { storageService, StorageToken } from '@/services/StorageService';
import useStackService from '@/stacks/useStackService';
import { uploadFile } from '@/utils/upload';
import { Toast } from '@td-design/react-native';
import { File } from '@td-design/react-native-image-picker';
import { useMemoizedFn } from '@td-design/rn-hooks';

export function useUserService() {
  const { update } = useStackService.useModel();
  const { successNotify, failNotify } = useNotify();
  const { convertErrorMsg } = useError();
  const { signOut, updateStorage } = storageService;

  // 修改头像
  const changeAvatar = async (file: File) => {
    try {
      Toast.process('提交中...');
      const data = await uploadFile(file);
      const newValues = {
        profilePicture: data,
      };
      const success = await mockChangeAvatar(newValues);
      if (success) {
        updateStorage(StorageToken.UserInfo, {
          profilePicture: data,
        });
        successNotify('修改头像成功');
      }
      return data;
    } catch (error) {
      failNotify('修改头像失败');
    }
  };

  // 修改昵称
  const updateNickname = async (value?: string) => {
    if (!value) {
      failNotify('昵称输入为空');
      return;
    }
    try {
      Toast.process('提交中...');
      const success = await mockUpdateUsername({ userName: value });
      if (success) {
        updateStorage(StorageToken.UserInfo, {
          userName: value,
        });
        successNotify('修改昵称成功');
      }
    } catch (error) {
      failNotify('修改昵称失败');
    }
  };

  /** 下拉刷新更新用户状态 */
  const refreshUserInfo = async () => {
    try {
      const result = await mockFetchUserInfo();
      updateStorage(StorageToken.UserInfo, result);
    } catch (error) {
      const message = convertErrorMsg(error);
      failNotify(message);
      // 用户信息获取失败自动认为登录失效
      logout();
    }
  };

  const logout: () => void = () => {
    signOut();
    update();
  };

  return {
    signOut: useMemoizedFn(logout),
    changeAvatar: useMemoizedFn(changeAvatar),
    updateNickname: useMemoizedFn(updateNickname),
    refreshUserInfo: useMemoizedFn(refreshUserInfo),
  };
}
