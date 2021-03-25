import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function LoginTab({ isSmsLogin, onPress }: { isSmsLogin: boolean; onPress: (key: string) => void }) {
  return (
    <ImageBackground
      style={styles.tab}
      source={isSmsLogin ? require('./assets/bg1.webp') : require('./assets/bg2.webp')}
    >
      <TouchableOpacity style={[styles.item]} onPress={() => onPress('sms')}>
        <Text style={[styles.text]}>验证码登录</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.item]} onPress={() => onPress('pass')}>
        <Text style={[styles.text, styles.unselected]}>密码登录</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    height: 50,
    width: 346,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    transform: [{ translateY: -10 }],
  },
  item: {
    flex: 1,
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
