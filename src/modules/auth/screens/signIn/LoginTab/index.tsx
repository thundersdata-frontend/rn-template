import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';

import { AppTheme } from 'theme';

const { width } = Dimensions.get('window');
export function LoginTab({ isSmsLogin, onPress }: { isSmsLogin: boolean; onPress: (key: string) => void }) {
  const theme = useTheme<AppTheme>();
  const styles = StyleSheet.create({
    item: {
      alignItems: 'center',
      height: 50,
      justifyContent: 'center',
      width: (width - 36) / 2,
    },
    tab: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flexDirection: 'row',
      height: 50,
      transform: [{ translateY: -10 }],
    },
    text: {
      color: theme.colors.gray500,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 22,
    },
    unselected: {
      color: theme.colors.gray500,
    },
  });

  return (
    <ImageBackground
      style={styles.tab}
      source={isSmsLogin ? require('./assets/bg1.webp') : require('./assets/bg2.webp')}
    >
      <TouchableOpacity style={styles.item} onPress={() => onPress('sms')} activeOpacity={1}>
        <Text style={[styles.text, !isSmsLogin ? styles.unselected : {}]}>验证码登录</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => onPress('pass')} activeOpacity={1}>
        <Text style={[styles.text, isSmsLogin ? styles.unselected : {}]}>密码登录</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
