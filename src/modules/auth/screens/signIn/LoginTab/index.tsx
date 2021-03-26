import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
export default function LoginTab({ isSmsLogin, onPress }: { isSmsLogin: boolean; onPress: (key: string) => void }) {
  return (
    <ImageBackground
      style={styles.tab}
      source={isSmsLogin ? require('./assets/bg1.webp') : require('./assets/bg2.webp')}
    >
      <TouchableOpacity style={[styles.item]} onPress={() => onPress('sms')} activeOpacity={1}>
        <Text style={[styles.text]}>验证码登录</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.item]} onPress={() => onPress('pass')} activeOpacity={1}>
        <Text style={[styles.text, styles.unselected]}>密码登录</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    transform: [{ translateY: -10 }],
  },
  item: {
    width: (width - 36) / 2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    fontWeight: '500',
  },
  unselected: {
    color: '#666',
  },
});
