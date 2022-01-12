import { Toast } from '@td-design/react-native';
import { useSafeState, useMemoizedFn } from '@td-design/rn-hooks';
import { uploadFile } from 'utils/upload';
import { userInfoAtom } from 'atoms';
import { useToast } from 'hooks/useToast';
import { useError } from 'hooks/useError';
import { useUpdateAtom } from 'jotai/utils';
import { mockChangeAvatar, mockFetchUserInfo, mockUpdateUsername } from 'modules/mock';
import { File } from '@td-design/react-native-image-picker';
import { useSignout } from 'hooks/useSignout';

export function useUserService() {
  const updateUserInfo = useUpdateAtom(userInfoAtom);
  const { toastSuccess, toastFail } = useToast();
  const { convertErrorMsg } = useError();
  const { signOut } = useSignout();
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
        updateUserInfo(draft => ({
          ...draft,
          userName: value,
        }));
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
      updateUserInfo(result);
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
