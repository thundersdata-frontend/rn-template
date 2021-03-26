import Container from 'modules/auth/components/Container';
import React, { useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, Extrapolate, interpolate } from 'react-native-reanimated';
import { useTransition } from 'react-native-redash';
import LoginForm from './LoginForm';

const { width } = Dimensions.get('window');

export default function SignIn() {
  const [showLoginForm, setLoginForm] = useState<number>(0);

  const showAnimation = useTransition(showLoginForm, { duration: 600, easing: Easing.inOut(Easing.ease) });
  /**
   * 按钮点击之后触发动画效果：
   * 1. logo和欢迎语移动到左上角
   * 2. 登录按钮组渐隐
   * 3. 表单从底部滑入页面中间
   */
  const handlePress = (key: number) => {
    setLoginForm(key);
  };

  return (
    <Container>
      <View style={{ flex: 1 }}>
        {/* logo和欢迎语 */}
        <Animated.View
          style={{
            marginTop: interpolate(showAnimation, {
              inputRange: [0, 1],
              outputRange: [200, 75],
              extrapolate: Extrapolate.CLAMP,
            }),
            marginBottom: 25,
          }}
        >
          <Animated.Image
            source={require('../../assets/logo.webp')}
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
        {/* 登录按钮组 */}
        <Animated.View
          style={{
            alignItems: 'center',
            transform: [
              {
                translateY: interpolate(showAnimation, {
                  inputRange: [0, 1],
                  outputRange: [125, 300],
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
            onPress={() => handlePress(1)}
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
            onPress={() => handlePress(1)}
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
        <LoginForm {...{ showLoginForm, showAnimation }} />
      </View>
      {/* 底部第三方登录 */}
      <View style={{ height: 120 }}>
        <View
          style={{
            width,
            paddingHorizontal: 60,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.16)', width: 55 }} />
          <View style={{ paddingHorizontal: 10, transform: [{ translateY: -10 }] }}>
            <Text style={{ fontSize: 14, lineHeight: 20, color: '#fff' }}>第三方登录</Text>
          </View>
          <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.16)', width: 55 }} />
        </View>
        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => handlePress(0)}>
            <Image source={require('../../assets/weichat.webp')} style={{ width: 48, height: 48 }} />
          </TouchableOpacity>
          <View style={{ width: 85 }} />
          <TouchableOpacity onPress={() => handlePress(0)}>
            <Image source={require('../../assets/qq.webp')} style={{ width: 48, height: 48 }} />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
