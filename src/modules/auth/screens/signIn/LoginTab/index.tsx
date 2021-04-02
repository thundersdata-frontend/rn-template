import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
export default function LoginTab({ isSmsLogin, onPress }: { isSmsLogin: boolean; onPress: (key: string) => void }) {
  return (
    <ImageBackground
      style={styles.tab}
      source={isSmsLogin ? require('./assets/bg1.webp') : require('./assets/bg2.webp')}>
      <TouchableOpacity style={[styles.item]} onPress={() => onPress('sms')} activeOpacity={1}>
        <Text style={[styles.text, !isSmsLogin ? styles.unselected : {}]}>验证码登录</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.item]} onPress={() => onPress('pass')} activeOpacity={1}>
        <Text style={[styles.text, isSmsLogin ? styles.unselected : {}]}>密码登录</Text>
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
