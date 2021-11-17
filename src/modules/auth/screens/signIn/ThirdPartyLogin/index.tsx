import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import { Flex, helpers } from '@td-design/react-native';
import { Box, Text, Icon } from 'components';
import { AppTheme } from 'theme';
import { useTheme } from '@shopify/restyle';

const { px, deviceWidth } = helpers;
const ICON_SIZE = px(24);

export function ThirdPartyLogin({
  animation,
  onPress,
}: {
  animation: Animated.SharedValue<number>;
  onPress: (status: number) => void;
}) {
  const theme = useTheme<AppTheme>();
  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: mix(animation.value, 0, 20),
      },
    ],
  }));
  return (
    <Animated.View style={[{ height: px(110) }, style]}>
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
        <TouchableOpacity
          style={[styles.icon, { backgroundColor: theme.colors.iconBg }]}
          activeOpacity={0.5}
          onPress={() => onPress(0)}
        >
          <Icon name="qq" size={ICON_SIZE} color={theme.colors.background} />
        </TouchableOpacity>
        <Box width={px(85)} />
        <TouchableOpacity
          style={[styles.icon, { backgroundColor: theme.colors.iconBg }]}
          activeOpacity={0.5}
          onPress={() => onPress(0)}
        >
          <Icon name="wechat" size={ICON_SIZE} color={theme.colors.background} />
        </TouchableOpacity>
      </Flex>
    </Animated.View>
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
