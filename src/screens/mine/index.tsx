import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Color, Size } from '../../config';
import { Button, Modal, WhiteSpace } from '@ant-design/react-native';
import { signOut } from '../../utils/auth';
import Container from '../../components/Container';
import BackgroundImgHeader from '../../components/BackgroundImgHeader';
import Iconfont from '../../components/Iconfont';
import Avatar from '../../components/Avatar';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { SignInContext } from '../../context/SignInContext';
import store from '../../store';

const { px } = Size;
const Profile = (props: StackHeaderProps) => {
  const [state] = store.useModel('user');
  const { setSignedIn } = useContext(SignInContext);

  /**
   * 退出登录
   */
  const logout = () => {
    Modal.alert(
      '退出登录',
      '您确定退出登录吗',
      [
        { text: '取消', onPress: () => {} },
        {
          text: '确定',
          onPress: async () => {
            await signOut();
            setSignedIn(false);
          }
        }
      ],
      () => true
    );
  };

  return (
    <Container style={{ marginTop: 0, backgroundColor: Color.backgroundColor }}>
      <BackgroundImgHeader
        showRadius={false}
        backgroundImg={require('../../images/pic_my_head.png')}
        leftIcon={<Iconfont name="navMenu" size={Size.px(20)} color={Color.white} />}
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
        {...props}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            uri={state.avatar}
            width={px(54)}
            style={{ borderWidth: px(3), borderColor: 'rgba(255,255,255,0.2)' }}
          />
          <Text style={{ fontSize: px(18), fontWeight: '500', color: Color.white, marginTop: Size.px(10) }}>
            {state.name}
          </Text>
        </View>
      </BackgroundImgHeader>
      <WhiteSpace />
      <Button style={styles.logoutBtn} onPress={() => logout()}>
        <Text style={styles.logoutText}>退出登录</Text>
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: Color.white,
    borderColor: 'transparent'
  },
  logoutText: {
    color: Color.primary,
    fontSize: px(16)
  }
});

export default Profile;
