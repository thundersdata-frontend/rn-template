import { Box, Flex, helpers, Text, useTheme } from '@td-design/react-native';

import { EnhancedTouchableOpacity } from '@/components/EnhancedTouchable';
import Icon from '@/components/Icon';
import { AppTheme } from '@/theme';

const { px } = helpers;
export function LoginTab({ isSmsLogin, onPress }: { isSmsLogin: boolean; onPress: (key: string) => void }) {
  const theme = useTheme<AppTheme>();

  return (
    <Box>
      <Box position="absolute" height={px(50)} width="100%" style={{ marginTop: -px(8) }}>
        <Icon
          name={isSmsLogin ? 'smsTab' : 'passTab'}
          width="100%"
          height={px(50)}
          color={[theme.colors.tabActive, theme.colors.background]}
        />
      </Box>
      <Flex width="100%">
        <Flex.Item>
          <EnhancedTouchableOpacity onPress={() => onPress('sms')} activeOpacity={1}>
            <Box height={px(50)} justifyContent="center" alignItems="center" paddingBottom="x3">
              <Text variant="h2" color={!isSmsLogin ? 'gray600' : 'gray500'}>
                验证码登录
              </Text>
            </Box>
          </EnhancedTouchableOpacity>
        </Flex.Item>
        <Flex.Item>
          <EnhancedTouchableOpacity onPress={() => onPress('pass')} activeOpacity={1}>
            <Box height={px(50)} justifyContent="center" alignItems="center" paddingBottom="x3">
              <Text variant="h2" color={isSmsLogin ? 'gray600' : 'gray500'}>
                密码登录
              </Text>
            </Box>
          </EnhancedTouchableOpacity>
        </Flex.Item>
      </Flex>
    </Box>
  );
}
