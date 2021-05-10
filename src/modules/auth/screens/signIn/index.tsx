import React, { useState } from 'react';
import { View } from 'react-native';
import { Easing, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container } from 'modules/auth/components/Container';

import { LoginForm } from './LoginForm';
import { Logo } from './Logo';
import { ThirdPartyLogin } from './ThirdPartyLogin';
import { LoginBtnGroup } from './LoginBtnGroup';
import { StackNavigationProp } from '@react-navigation/stack';

const timingConfig = {
  duration: 600,
  easing: Easing.inOut(Easing.ease),
};
export function SignIn({ navigation }: { navigation: StackNavigationProp<AuthStackParamList, 'SignIn'> }) {
  const [activeKey, setActiveKey] = useState('sms');
  const isSmsLogin = activeKey === 'sms';

  const showLoginForm = useSharedValue(false);
  const animation = useDerivedValue(() =>
    showLoginForm.value ? withTiming(1, timingConfig) : withTiming(0, timingConfig),
  );

  /**
   * 按钮点击之后触发动画效果：
   * 1. logo和欢迎语移动到左上角
   * 2. 登录按钮组渐隐
   * 3. 表单从底部滑入页面中间
   */
  const handlePress = (activeKey: string) => {
    showLoginForm.value = true;
    setActiveKey(activeKey);
  };

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView enableOnAndroid keyboardShouldPersistTaps="handled">
          {/* logo和欢迎语 */}
          <Logo {...{ animation }} />
          {/* 登录按钮组 */}
          <LoginBtnGroup {...{ animation }} onPress={handlePress} />
          {/* 登录表单 */}
          <LoginForm {...{ showLoginForm, animation, isSmsLogin, changeTab: setActiveKey, navigation }} />
        </KeyboardAwareScrollView>
      </View>
      {/* 底部第三方登录 */}
      <ThirdPartyLogin {...{ animation }} onPress={() => (showLoginForm.value = false)} />
    </Container>
  );
}
