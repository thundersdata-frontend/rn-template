import { StyleSheet, TouchableOpacity } from 'react-native';
import { Flex, helpers, Box, Text } from '@td-design/react-native';
import { Icon } from 'components';
import { AppTheme } from 'theme';
import { useTheme } from '@shopify/restyle';

const { px, deviceWidth } = helpers;
const ICON_SIZE = px(24);

export function ThirdPartyLogin() {
  const theme = useTheme<AppTheme>();
  return (
    <Box height={px(110)} marginTop="x5">
      <Flex
        width={deviceWidth}
        justifyContent="center"
        style={{
          paddingHorizontal: 60,
        }}
      >
        <Box backgroundColor="border" height={1} width={px(55)} />
        <Box paddingHorizontal="x3">
          <Text variant="p1" color="white">
            第三方登录
          </Text>
        </Box>
        <Box backgroundColor="border" height={1} width={px(55)} />
      </Flex>
      <Flex marginTop="x3" justifyContent="center">
        <TouchableOpacity style={[styles.icon, { backgroundColor: theme.colors.iconBg }]} activeOpacity={0.5}>
          <Icon name="qq" size={ICON_SIZE} color={theme.colors.background} />
        </TouchableOpacity>
        <Box width={px(85)} />
        <TouchableOpacity style={[styles.icon, { backgroundColor: theme.colors.iconBg }]} activeOpacity={0.5}>
          <Icon name="wechat" size={ICON_SIZE} color={theme.colors.background} />
        </TouchableOpacity>
      </Flex>
    </Box>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: ICON_SIZE * 2,
    height: ICON_SIZE * 2,
    borderRadius: ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
