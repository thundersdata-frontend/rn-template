import { Pressable } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, Center, Divider, Flex, helpers, Text, useTheme, WhiteSpace, WingBlank } from '@td-design/react-native';
import { useSetAtom } from 'jotai';

import { confirmedAtom } from '@/atoms';
import { Container } from '@/components/Container';
import { ExitApp } from '@/components/ExitApp';
import { AppTheme } from '@/theme';

export const PrivacyConfirm = () => {
  const theme = useTheme<AppTheme>();
  const navigation = useNavigation<NavigationProp<AuthStackParamList & CommonStackParamList>>();
  const updateConfirm = useSetAtom(confirmedAtom);

  const handleOk = () => {
    // TODO 在这里init各种SDK
    updateConfirm(true);
    navigation.navigate('SignIn');
  };

  const handleCancel = () => {
    ExitApp.exit();
  };

  return (
    <Container backgroundColor={theme.colors.mask}>
      <WingBlank>
        <Center>
          <Box backgroundColor="white" borderRadius="x2">
            <Box padding="x3">
              <Text variant="h1" color="black" textAlign={'center'}>
                用户协议与隐私政策
              </Text>
              <WhiteSpace />
              <Text variant="p1">
                感谢您使用APP!我们非常重视您的个人信息和隐私保护。
                为了更好地保障您的个人权益，在您使用我们的产品前，请务必审慎阅读
                <Pressable onPress={() => navigation.navigate('Privacy')}>
                  <Text color="primary200" fontWeight="900">
                    《隐私政策》
                  </Text>
                </Pressable>
                和
                <Pressable onPress={() => navigation.navigate('Agreement')}>
                  <Text color="primary200" fontWeight="900">
                    《用户协议》
                  </Text>
                </Pressable>
                内的所有条款。
                尤其是：1.我们对您的个人信息的收集/保存/使用/对外提供/保护等规则条款，以及您的用户权利等条款；
                2.约定我们的限制责任和免责条款； 3.其他以颜色或加粗等标识的重要条款。
              </Text>
              <Text variant="p1">
                您点击“同意并继续”的行为即表示您已阅读完毕并同意以上协议的全部内容。请点击“同意并继续”，开始使用我们的产品和服务。
              </Text>
            </Box>
            <WhiteSpace />
            <Flex height={50} borderTopWidth={helpers.ONE_PIXEL} borderTopColor="border">
              <Flex.Item alignItems="center" justifyContent="center">
                <Pressable onPress={handleCancel}>
                  <Text color="func600">不同意</Text>
                </Pressable>
              </Flex.Item>
              <Divider axis="vertical" />
              <Flex.Item alignItems="center" justifyContent="center">
                <Pressable onPress={handleOk}>
                  <Text color="primary200">同意并继续</Text>
                </Pressable>
              </Flex.Item>
            </Flex>
          </Box>
        </Center>
      </WingBlank>
    </Container>
  );
};
