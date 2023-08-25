import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ActionSheet, Avatar, helpers, Input, List, Modal, Text, WingBlank } from '@td-design/react-native';
import { Image } from 'expo-image';
import { useAtomValue } from 'jotai';

import { userInfoAtom } from '@/atoms';
import { Container } from '@/components/Container';
import useImagePicker from '@/hooks/useImagePicker';
import useLogout from '@/hooks/useLogout';
import { useUserService } from '@/modules/user/useUserService';

const { px } = helpers;
export function Settings() {
  const { updateNickname, changeAvatar } = useUserService();
  const logout = useLogout();

  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const userInfo = useAtomValue(userInfoAtom);

  const handleFinish = (file: File) => {
    navigation.navigate('ImageCrop', { file, callback: changeAvatar });
  };

  const { launchLibrary, launchCamera, visible, onClose, onShow } = useImagePicker({ onFinish: handleFinish });

  const handleLogout = () => {
    Modal.confirm({
      icon: (
        <Image
          source={require('../../assets/modal_confirm.webp')}
          style={{ width: px(55), height: px(55), marginTop: px(36) }}
        />
      ),
      title: '退出登录',
      content: '确定要退出登录吗？',
      onOk: logout,
    });
  };

  return (
    <Container>
      <WingBlank>
        <List
          items={[
            {
              title: '修改头像',
              arrow: 'horizontal',
              extra: (
                <Avatar
                  size={px(44)}
                  title={userInfo.userName?.charAt(0).toUpperCase()}
                  url={userInfo.profilePicture}
                />
              ),
              onPress: onShow,
            },
            {
              title: '修改昵称',
              arrow: 'horizontal',
              extra: <Text variant="p0">{userInfo.userName}</Text>,
              onPress() {
                Modal.prompt({
                  title: '修改昵称',
                  input: <Input placeholder="请输入昵称" />,
                  onOk: updateNickname,
                });
              },
            },
            {
              title: '修改密码',
              arrow: 'horizontal',
              onPress() {
                navigation.navigate('ModifyPassword');
              },
            },
            {
              title: '退出登录',
              arrow: 'horizontal',
              onPress: handleLogout,
            },
          ]}
        />
      </WingBlank>
      {/* 打开相册或者打开相机 */}
      <ActionSheet
        items={[
          { text: '打开相册', onPress: launchLibrary },
          { text: '打开摄像头', onPress: launchCamera },
        ]}
        onCancel={onClose}
        visible={visible}
      />
    </Container>
  );
}
