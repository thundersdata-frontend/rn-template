import { NavigationProp, useNavigation } from '@react-navigation/native';
import { KeyboardInsetsView } from '@sdcx/keyboard-insets';
import {
  Box,
  Button,
  CountDown,
  Flex,
  Form,
  Input,
  Radio,
  Text,
  Theme,
  useTheme,
  WhiteSpace,
} from '@td-design/react-native';

import { EnhancedTouchableOpacity } from '@/components/EnhancedTouchable';
import Icon from '@/components/Icon';
import { SmsTypeEnum } from '@/enums';
import { ErrorMessage } from '@/modules/auth/components/ErrorMessage';
import { useAuthService } from '@/modules/auth/useAuthService';
import { AppTheme } from '@/theme';
import { mobilePhoneRules } from '@/utils/validators';

import { LoginTab } from '../LoginTab';

const { FormItem, useForm } = Form;

const FormContent = ({ isSmsLogin }: { isSmsLogin: boolean }) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList & CommonStackParamList, 'SignIn'>>();
  const [form] = useForm();
  const theme = useTheme<AppTheme>();
  const { loading, error, handleFormValueChange, submitFormFailed, beforeSendSms, smsSend, handleFinish, disabled } =
    useAuthService(isSmsLogin);

  return (
    <Form form={form} onFinish={handleFinish} onFinishFailed={submitFormFailed} onValuesChange={handleFormValueChange}>
      {isSmsLogin ? (
        <Box>
          <FormItem name="phone" rules={mobilePhoneRules}>
            <Input
              placeholder="请输入手机号"
              keyboardType="phone-pad"
              leftIcon={<Icon name="mobile" color={theme.colors.icon} />}
              allowClear
            />
          </FormItem>
          <WhiteSpace size="x6" />
          <FormItem name="sms" rules={[{ required: true, message: '请输入验证码' }]}>
            <CountDown
              bordered
              leftIcon={<Icon name="sms" color={theme.colors.icon} />}
              onBefore={() => beforeSendSms(form.getFieldValue('phone'))}
              onSend={() => smsSend({ mobile: form.getFieldValue('phone'), type: SmsTypeEnum.登录 })}
            />
          </FormItem>
        </Box>
      ) : (
        <Box>
          <FormItem name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="请输入用户名" leftIcon={<Icon name="user" color={theme.colors.icon} />} allowClear />
          </FormItem>
          <WhiteSpace size="x6" />
          <FormItem name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input
              inputType="password"
              placeholder="请输入密码"
              leftIcon={<Icon name="password" color={theme.colors.icon} />}
            />
          </FormItem>
        </Box>
      )}

      <Flex justifyContent="space-between" alignItems="flex-start" height={32} marginTop="x1">
        {error ? <ErrorMessage text={error} /> : <Text />}
        {!isSmsLogin && (
          <EnhancedTouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ForgetPass')}>
            <Text variant="p1" color="gray400">
              忘记密码?
            </Text>
          </EnhancedTouchableOpacity>
        )}
      </Flex>
      <Button disabled={disabled} loading={loading} onPress={form.submit} title="登录" />
      <FormItem name="agree" rules={[{ required: true, message: '请勾选用户协议和隐私政策' }]}>
        <Radio
          size={14}
          containerStyle={{ marginVertical: 8 }}
          options={[
            {
              value: 1,
              label: (
                <Flex justifyContent="flex-start" alignItems="center" style={{ marginLeft: -4 }}>
                  <Text variant="p2" color="gray300">
                    我已阅读并同意
                  </Text>
                  <EnhancedTouchableOpacity
                    onPress={evt => {
                      evt.stopPropagation();
                      navigation.navigate('Agreement');
                    }}
                  >
                    <Text variant="p2" color="primary200">
                      用户协议
                    </Text>
                  </EnhancedTouchableOpacity>
                  <Text variant="p2" color="gray300">
                    和
                  </Text>
                  <EnhancedTouchableOpacity
                    onPress={evt => {
                      evt.stopPropagation();
                      navigation.navigate('Privacy');
                    }}
                  >
                    <Text variant="p2" color="primary200">
                      隐私政策
                    </Text>
                  </EnhancedTouchableOpacity>
                </Flex>
              ),
            },
          ]}
        />
      </FormItem>
      <EnhancedTouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Register')}>
        <Text variant="p1" color="primary200" textDecorationLine="underline">
          去注册&gt;&gt;
        </Text>
      </EnhancedTouchableOpacity>
    </Form>
  );
};

export function LoginForm({ isSmsLogin, changeTab }: { isSmsLogin: boolean; changeTab: (activeKey: string) => void }) {
  const theme = useTheme<Theme>();
  return (
    <Box
      alignItems="center"
      backgroundColor="background"
      borderRadius="x5"
      marginHorizontal="x4"
      marginVertical="x3"
      paddingBottom={'x4'}
    >
      <LoginTab
        isSmsLogin={isSmsLogin}
        onPress={e => {
          changeTab(e);
        }}
      />
      <KeyboardInsetsView
        style={{ marginTop: theme.spacing.x3, paddingHorizontal: theme.spacing.x4, width: '100%' }}
        extraHeight={8}
      >
        <FormContent {...{ isSmsLogin }} />
      </KeyboardInsetsView>
    </Box>
  );
}
