import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';

export default function LoginBtnGroup({
  showAnimation,
  onPress,
}: {
  showAnimation: Animated.Node<number>;
  onPress: (activeKey: string) => void;
}) {
  return (
    <Animated.View
      style={{
        alignItems: 'center',
        transform: [
          {
            translateY: interpolate(showAnimation, {
              inputRange: [0, 1],
              outputRange: [80, 300],
              extrapolate: Extrapolate.CLAMP,
            }),
          },
          {
            scale: interpolate(showAnimation, {
              inputRange: [0, 1],
              outputRange: [1, 0.7],
              extrapolate: Extrapolate.CLAMP,
            }),
          },
        ],
        opacity: interpolate(showAnimation, {
          inputRange: [0, 1],
          outputRange: [1, 0],
          extrapolate: Extrapolate.CLAMP,
        }),
      }}
    >
      <TouchableOpacity
        onPress={() => onPress('sms')}
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
