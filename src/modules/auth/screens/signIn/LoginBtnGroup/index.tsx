import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

export default function LoginBtnGroup({
  animation,
  onPress,
}: {
  animation: Animated.SharedValue<number>;
  onPress: (activeKey: string) => void;
}) {
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
      <TouchableOpacity
        onPress={() => onPress('sms')}
        activeOpacity={0.8}
        style={{
          width: 247,
          height: 44,
          borderRadius: 4,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 16, lineHeight: 22, color: '#3171F0' }}>验证码登录</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress('pass')}
        activeOpacity={0.8}
        style={{
          width: 247,
          height: 44,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 16, lineHeight: 22, color: '#fff' }}>密码登录</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
