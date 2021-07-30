import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ListItem, Modal, Image, helpers, Input } from '@td-design/react-native';

import { Box } from 'components';
import { useUpdateAtom } from 'jotai/utils';
import { authAtom } from 'atoms';
import { useUserService } from 'modules/user/useUserService';
import { signOut } from 'utils/auth';

const { px } = helpers;
export function Settings() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const updateAuth = useUpdateAtom(authAtom);
  const { updateNickname } = useUserService();

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
      onOk: async () => {
        await signOut();
        updateAuth({ signedIn: false });
      },
    });
  };

  return (
    <Box>
      <ListItem
        title="修改昵称"
        arrow="horizontal"
        extra={''} // 昵称
        onPress={() =>
          Modal.prompt({
            title: '修改昵称',
            input: <Input placeholder="请输入昵称" />,
            onOk: updateNickname,
          })
        }
      />
      <ListItem title="修改密码" arrow="horizontal" onPress={() => navigation.navigate('ModifyPassword')} />
      <ListItem title="注销登录" arrow="horizontal" onPress={handleLogout} />
    </Box>
  );
}
