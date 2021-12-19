import { TouchableOpacity } from 'react-native';
import Form, { Field, useForm } from 'rc-field-form';
import { useTheme } from '@shopify/restyle';
import { Button, Radio, CountDown, Flex, helpers, Input, WhiteSpace, Text, Box } from '@td-design/react-native';

import { LoginTab } from '../LoginTab';
import { useAuthService } from 'modules/auth/useAuthService';
import { mobilePhoneRules } from 'utils/validators';
import { ErrorMessage } from 'modules/auth/components/ErrorMessage';
import { AppTheme } from 'theme';
import { Icon } from 'components';
import { SmsTypeEnum } from 'enums';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const FormContent = ({ isSmsLogin }: { isSmsLogin: boolean }) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList, 'SignIn'>>();
  const [form] = useForm();
  const theme = useTheme<AppTheme>();
  const { loading, error, handleFormValueChange, submitFormFailed, beforeSendSms, smsSend, handleFinish, disabled } =
    useAuthService(isSmsLogin);

  return (
    <Form
      component={false}
      form={form}
      onFinish={handleFinish}
      onFinishFailed={submitFormFailed}
      onValuesChange={handleFormValueChange}
    >
      {isSmsLogin ? (
        <Box>
          <Field name="phone" rules={mobilePhoneRules}>
            <Input
              placeholder="请输入手机号"
              keyboardType="phone-pad"
              leftIcon={<Icon name="mobile" color={theme.colors.icon} />}
              allowClear
            />
          </Field>
          <WhiteSpace size="x6" />
          <Field name="sms" rules={[{ required: true, message: '请输入验证码' }]}>
            <CountDown
              bordered
              leftIcon={<Icon name="sms" color={theme.colors.icon} />}
              onBeforeSend={() => beforeSendSms(form.getFieldValue('phone'))}
              onSend={() => smsSend({ mobile: form.getFieldValue('phone'), type: SmsTypeEnum.登录 })}
            />
          </Field>
        </Box>
      ) : (
        <Box>
          <Field name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="请输入用户名" leftIcon={<Icon name="user" color={theme.colors.icon} />} allowClear />
          </Field>
          <WhiteSpace size="x6" />
          <Field name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input
              inputType="password"
              placeholder="请输入密码"
              leftIcon={<Icon name="password" color={theme.colors.icon} />}
            />
          </Field>
        </Box>
      )}

      <Flex justifyContent="space-between" alignItems="flex-start" height={32} marginTop="x1">
        {!!error ? <ErrorMessage text={error} /> : <Text />}
        {!isSmsLogin && (
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ForgetPass')}>
            <Text variant="p1" color="gray400">
              忘记密码?
            </Text>
          </TouchableOpacity>
        )}
      </Flex>
      <Button disabled={disabled} loading={loading} onPress={form.submit} title="登录" />
      <Field name="agree" rules={[{ required: true, message: '请勾选用户协议和隐私政策' }]}>
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
                  <TouchableOpacity
                    onPress={evt => {
                      evt.stopPropagation();
                      navigation.navigate('UserAgreement');
                    }}
                  >
                    <Text variant="p2" color="primary200">
                      用户协议
                    </Text>
                  </TouchableOpacity>
                  <Text variant="p2" color="gray300">
                    和
                  </Text>
                  <TouchableOpacity
                    onPress={evt => {
                      evt.stopPropagation();
                      navigation.navigate('Privacy');
                    }}
                  >
                    <Text variant="p2" color="primary200">
                      隐私政策
                    </Text>
                  </TouchableOpacity>
                </Flex>
              ),
            },
          ]}
        />
      </Field>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Register')}>
        <Text variant="p1" color="primary200" textDecorationLine="underline">
          去注册&gt;&gt;
        </Text>
      </TouchableOpacity>
    </Form>
  );
};

const { px } = helpers;
export function LoginForm({ isSmsLogin, changeTab }: { isSmsLogin: boolean; changeTab: (activeKey: string) => void }) {
  return (
    <Box
      alignItems="center"
      backgroundColor="background"
      borderRadius="x5"
      height={px(320)}
      marginHorizontal="x4"
      marginVertical="x3"
    >
      <LoginTab
        isSmsLogin={isSmsLogin}
        onPress={e => {
          changeTab(e);
        }}
      />
      <Box marginTop="x3" paddingHorizontal="x4" width="100%">
        <FormContent {...{ isSmsLogin }} />
      </Box>
    </Box>
  );
}
