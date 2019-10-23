import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native';
import { Colors, Size } from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import { Button, WingBlank, Modal } from '@ant-design/react-native';
import { SafeAreaView, NavigationScreenProp, NavigationRoute } from 'react-navigation';
import DetailItem from '../../components/DetailItem';
import { signOut, getUserInfo } from '../../utils/auth';

const Profile: React.FC<{ navigation: NavigationScreenProp<NavigationRoute> }> = props => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUserInfo().then(userInfo => {
      const { userBasicInfo } = userInfo;
      const { username } = userBasicInfo;
      setUserName(username);
    });
  }, []);

  /**
   * 退出登录
   */
  const logout = () => {
    Modal.alert(
      '退出登录',
      '您确定要退出吗？',
      [
        { text: '取消', onPress: () => {} },
        {
          text: '确定',
          onPress: async () => {
            await signOut();
            props.navigation.navigate('SignIn');
          },
        },
      ],
      () => true,
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'never', bottom: 'never' }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#0189FB', '#79BCFF']} style={styles.header}>
        <View style={styles.sectionContainer}>
          <View style={styles.avatarImgWrap}>
            <Image style={styles.avatarImg} source={require('../../assets/pic_avatar_default.png')} />
          </View>
          <View style={styles.flexBox}>
            <Text style={styles.sectionTitle}>{userName}</Text>
          </View>
        </View>
      </LinearGradient>
      <View>
        <WingBlank size="md">
          <View style={styles.cardWrap}>
            <DetailItem router="EditPass" icon="password" label="修改密码" iconColor="#40C0FF" rightArrow last />
          </View>
          <Button style={styles.logoutBtn} onPress={() => logout()}>
            <Text style={styles.logoutText}>退出登录</Text>
          </Button>
        </WingBlank>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.backgroundColor,
  },
  messageText: {
    fontSize: Size.px(14),
    color: Colors.labelColor,
  },
  cardWrap: {
    marginTop: Size.px(14),
    borderBottomWidth: 1,
    borderColor: '#E6EAEE',
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  redPoint: {
    backgroundColor: Colors.red,
    width: Size.px(8),
    height: Size.px(8),
    borderRadius: Size.px(8),
    marginLeft: Size.px(6),
  },
  body: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.white,
  },
  avatarImgWrap: {
    width: Size.px(70),
    height: Size.px(70),
    borderRadius: Size.px(70),
    position: 'absolute',
    top: Size.px(-35),
    overflow: 'hidden',
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  sectionContainer: {
    backgroundColor: Colors.white,
    marginTop: Size.px(60),
    paddingTop: Size.px(45),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    height: Size.px(120),
    width: Size.px(346),
  },
  header: {
    height: Size.px(220),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: Colors.labelColor,
    fontSize: Size.px(12),
    marginTop: Size.px(6),
  },
  sectionTitle: {
    fontSize: Size.px(18),
    fontWeight: '600',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: Size.px(12),
    fontWeight: '600',
    padding: Size.px(4),
    paddingRight: Size.px(12),
    textAlign: 'right',
  },
  logoutBtn: {
    backgroundColor: Colors.white,
    marginTop: Size.px(12),
    borderColor: 'transparent',
  },
  logoutText: {
    color: Colors.red,
  },
});

export default Profile;
