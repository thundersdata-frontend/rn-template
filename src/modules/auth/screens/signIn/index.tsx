import { useSafeState } from '@td-design/rn-hooks';
import { Container } from 'modules/auth/components/Container';

import { Logo } from './Logo';
import { LoginForm } from './LoginForm';
import { ThirdPartyLogin } from './ThirdPartyLogin';
import { KeyboardShift } from 'components/KeyboardShift';

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
