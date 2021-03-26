import Container from 'modules/auth/components/Container';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { useTransition } from 'react-native-redash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LoginForm from './LoginForm';
import Logo from './Logo';
import ThirdPartyLogin from './ThirdPartyLogin';
import LoginBtnGroup from './LoginBtnGroup';

export default function SignIn() {
  const [showLoginForm, setLoginForm] = useState<number>(0);
  const [activeKey, setActiveKey] = useState('sms');
  const isSmsLogin = activeKey === 'sms';

  const showAnimation = useTransition(showLoginForm, { duration: 600, easing: Easing.inOut(Easing.ease) });
  /**
   * 按钮点击之后触发动画效果：
   * 1. logo和欢迎语移动到左上角
   * 2. 登录按钮组渐隐
   * 3. 表单从底部滑入页面中间
   */
  const handlePress = (activeKey: string) => {
    setLoginForm(1);
    setActiveKey(activeKey);
  };

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView enableOnAndroid>
          {/* logo和欢迎语 */}
          <Logo {...{ showAnimation }} />
          {/* 登录按钮组 */}
          <LoginBtnGroup {...{ showAnimation }} onPress={handlePress} />
          {/* 登录表单 */}
          <LoginForm {...{ showLoginForm, showAnimation, isSmsLogin, changeTab: setActiveKey }} />
        </KeyboardAwareScrollView>
      </View>
      {/* 底部第三方登录 */}
      <ThirdPartyLogin {...{ showAnimation }} onPress={setLoginForm} />
    </Container>
  );
}
