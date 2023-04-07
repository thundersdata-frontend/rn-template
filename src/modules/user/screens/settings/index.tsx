import { useNavigation } from '@react-navigation/native';
import { helpers, Image, Input, List, Modal, WingBlank } from '@td-design/react-native';

import { Container } from '@/components/Container';
import { useUserService } from '@/modules/user/useUserService';

const { px } = helpers;
export function Settings() {
  const navigation = useNavigation();
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
    <Container>
      <WingBlank>
        <List
          items={[
            {
              title: '修改昵称',
              arrow: 'horizontal',
              minHeight: px(48),
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
              minHeight: px(48),
              onPress() {
                navigation.navigate('ModifyPassword');
              },
            },
            {
              title: '退出登录',
              arrow: 'horizontal',
              minHeight: px(48),
              onPress: handleLogout,
            },
          ]}
        />
      </WingBlank>
    </Container>
  );
}
