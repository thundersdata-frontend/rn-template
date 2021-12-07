import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import { helpers, Text } from '@td-design/react-native';

import { AppTheme } from 'theme';

const { px } = helpers;
export function LoginBtnGroup({
  animation,
  onPress,
}: {
  animation: Animated.SharedValue<number>;
  onPress: (activeKey: string) => void;
}) {
  const theme = useTheme<AppTheme>();
  const styles = StyleSheet.create({
    btn: {
      width: px(247),
      height: px(44),
      borderRadius: theme.borderRadii.x1,
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const style = useAnimatedStyle(() => ({
    alignItems: 'center',
    transform: [
      {
        translateY: mix(animation.value, 80, 300),
      },
      {
        scale: mix(animation.value, 1, 0.7),
      },
    ],
    opacity: mix(animation.value, 1, 0),
  }));

  return (
    <Animated.View style={style}>
      <TouchableOpacity onPress={() => onPress('sms')} activeOpacity={0.5} style={styles.btn}>
        <Text variant="p0" color="primary200">
          验证码登录
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress('pass')}
        activeOpacity={0.5}
        style={[
          styles.btn,
          {
            marginTop: px(20),
            backgroundColor: theme.colors.transparent,
            borderColor: theme.colors.white,
            borderWidth: 1,
          },
        ]}
      >
        <Text variant="p0" color="white">
          密码登录
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
