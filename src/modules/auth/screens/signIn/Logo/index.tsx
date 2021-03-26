import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
export default function Logo({ showAnimation }: { showAnimation: Animated.Node<number> }) {
  return (
    <Animated.View
      style={{
        marginTop: interpolate(showAnimation, {
          inputRange: [0, 1],
          outputRange: [120, 55],
          extrapolate: Extrapolate.CLAMP,
        }),
        marginBottom: 25,
      }}
    >
      <Animated.Image
        source={require('../../../assets/logo.webp')}
        style={{
          width: 72,
          height: 72,
          marginBottom: 20,
          left: interpolate(showAnimation, {
            inputRange: [0, 1],
            outputRange: [(width - 72) / 2, 25],
            extrapolate: Extrapolate.CLAMP,
          }),
        }}
      />
      <Animated.Text
        style={{
          fontSize: 23,
          lineHeight: 32,
          color: '#fff',
          left: interpolate(showAnimation, {
            inputRange: [0, 1],
            outputRange: [(width - 200) / 2, 25],
            extrapolate: Extrapolate.CLAMP,
          }),
        }}
      >
        欢迎来到雷数科技！
      </Animated.Text>
    </Animated.View>
  );
}
