import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Box, Flex, helpers } from '@td-design/react-native';

import { AppTheme } from 'theme';
import { Icon } from 'components';

const { px, deviceWidth } = helpers;
export function LoginTab({ isSmsLogin, onPress }: { isSmsLogin: boolean; onPress: (key: string) => void }) {
  const theme = useTheme<AppTheme>();
  const styles = StyleSheet.create({
    tab: {
      width: deviceWidth - px(36),
      height: px(50),
      paddingBottom: px(10),
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      height: px(50),
    },
    text: {
      color: theme.colors.gray500,
      fontSize: px(16),
      fontWeight: '500',
      lineHeight: px(22),
    },
    unselected: {
      color: theme.colors.gray600,
    },
  });

  return (
    <Box>
      <Box position="absolute" height={px(50)} width={deviceWidth} top={-px(10)}>
        <Icon
          name={isSmsLogin ? 'smsTab' : 'passTab'}
          width={deviceWidth - px(36)}
          height={px(50)}
          color={[theme.colors.tabActive, theme.colors.background]}
        />
      </Box>
      <Flex style={styles.tab}>
        <Flex.Item>
          <TouchableOpacity style={styles.item} onPress={() => onPress('sms')} activeOpacity={1}>
            <Text style={[styles.text, !isSmsLogin ? styles.unselected : {}]}>验证码登录</Text>
          </TouchableOpacity>
        </Flex.Item>
        <Flex.Item>
          <TouchableOpacity style={styles.item} onPress={() => onPress('pass')} activeOpacity={1}>
            <Text style={[styles.text, isSmsLogin ? styles.unselected : {}]}>密码登录</Text>
          </TouchableOpacity>
        </Flex.Item>
      </Flex>
    </Box>
  );
}
