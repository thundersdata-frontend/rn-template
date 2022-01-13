import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, ListItem, Modal, Image, helpers, Input } from '@td-design/react-native';

import { useUserService } from 'modules/user/useUserService';

const { px } = helpers;
export function Settings() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { updateNickname, signOut } = useUserService();

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
      onOk: signOut,
    });
  };

  return (
    <Box>
      <ListItem
        title="修改昵称"
        arrow="horizontal"
        height={54}
        onPress={() =>
          Modal.prompt({
            title: '修改昵称',
            input: <Input placeholder="请输入昵称" />,
            onOk: updateNickname,
          })
        }
      />
      <ListItem title="修改密码" arrow="horizontal" height={54} onPress={() => navigation.navigate('ModifyPassword')} />
      <ListItem title="注销登录" arrow="horizontal" height={54} onPress={handleLogout} />
    </Box>
  );
}
