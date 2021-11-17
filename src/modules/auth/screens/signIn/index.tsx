import { Easing, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { helpers } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';
import { KeyboardAwareScrollView } from 'components';
import { Container } from 'modules/auth/components/Container';

import { Logo } from './Logo';
import { LoginBtnGroup } from './LoginBtnGroup';
import { LoginForm } from './LoginForm';
import { ThirdPartyLogin } from './ThirdPartyLogin';

const { px, deviceHeight } = helpers;
const timingConfig = {
  duration: 600,
  easing: Easing.inOut(Easing.ease),
};
export function SignIn() {
  const [activeKey, setActiveKey] = useSafeState('sms');
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
      <KeyboardAwareScrollView style={{ height: deviceHeight - px(180) }}>
        {/* logo和欢迎语 */}
        <Logo {...{ animation }} />
        {/* 登录按钮组 */}
        <LoginBtnGroup {...{ animation }} onPress={handlePress} />
        {/* 登录表单 */}
        <LoginForm {...{ showLoginForm, animation, isSmsLogin, changeTab: setActiveKey }} />
      </KeyboardAwareScrollView>
      {/* 底部第三方登录 */}
      <ThirdPartyLogin {...{ animation }} onPress={() => (showLoginForm.value = false)} />
    </Container>
  );
}
