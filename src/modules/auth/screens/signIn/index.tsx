import { useSafeState } from '@td-design/rn-hooks';
import { KeyboardShift } from 'components/KeyboardShift';
import { Container } from 'modules/auth/components/Container';

import { LoginForm } from './LoginForm';
import { Logo } from './Logo';
import { ThirdPartyLogin } from './ThirdPartyLogin';

export function SignIn() {
  const [activeKey, setActiveKey] = useSafeState('sms');
  const isSmsLogin = activeKey === 'sms';

  return (
    <Container>
      <KeyboardShift>
        {/* logo和欢迎语 */}
        <Logo />
        {/* 登录表单 */}
        <LoginForm {...{ isSmsLogin, changeTab: setActiveKey }} />
        {/* 底部第三方登录 */}
        <ThirdPartyLogin />
      </KeyboardShift>
    </Container>
  );
}
