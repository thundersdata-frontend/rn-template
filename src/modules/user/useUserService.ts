import { Toast } from '@td-design/react-native';
import { useSafeState, useMemoizedFn } from '@td-design/rn-hooks';
import { uploadFile } from 'utils/upload';
import { useToast } from 'hooks/useToast';
import { useError } from 'hooks/useError';
import { mockChangeAvatar, mockFetchUserInfo, mockUpdateUsername } from 'modules/mock';
import { File } from '@td-design/react-native-image-picker';
import { storageService, StorageToken } from 'services/StorageService';

export function useUserService() {
  const { toastSuccess, toastFail } = useToast();
  const { convertErrorMsg } = useError();
  const { signOut, updateStorage } = storageService;
  const [refreshing, setRefreshing] = useSafeState<boolean>(false);

  // 修改头像
  const changeAvatar = async (file: File) => {
    try {
      Toast.submitting();
      const data = await uploadFile(file);
      const newValues = {
        profilePicture: data,
      };
      const success = await mockChangeAvatar(newValues);
      if (success) {
        updateStorage(StorageToken.UserInfo, {
          profilePicture: data,
        });
        toastSuccess('修改头像成功');
      }
      return data;
    } catch (error) {
      toastFail('修改头像失败');
    }
  };

  // 修改昵称
  const updateNickname = async (value?: string) => {
    if (!value) {
      toastFail('昵称输入为空');
      return;
    }
    try {
      Toast.submitting();
      const success = await mockUpdateUsername({ userName: value });
      if (success) {
        updateStorage(StorageToken.UserInfo, {
          userName: value,
        });
        toastSuccess('修改昵称成功');
      }
    } catch (error) {
      toastFail('修改昵称失败');
    }
  };

  /** 下拉刷新更新用户状态 */
  const refreshUserInfo = async () => {
    try {
      setRefreshing(true);
      const result = await mockFetchUserInfo();
      updateStorage(StorageToken.UserInfo, result);
      setRefreshing(false);
    } catch (error) {
      const message = convertErrorMsg(error);
      toastFail(message);
      setRefreshing(false);
      // 用户信息获取失败自动认为登录失效
      signOut();
    }
  };

  return {
    refreshing,
    signOut,
    changeAvatar: useMemoizedFn(changeAvatar),
    updateNickname: useMemoizedFn(updateNickname),
    refreshUserInfo: useMemoizedFn(refreshUserInfo),
  };
}
