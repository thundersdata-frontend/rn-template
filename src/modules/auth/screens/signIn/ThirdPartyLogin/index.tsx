import { Image, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import { Flex, helpers } from '@td-design/react-native';
import { Box, Text } from 'components';

const { px, deviceWidth } = helpers;
const ICON_SIZE = px(48);

export function ThirdPartyLogin({
  animation,
  onPress,
}: {
  animation: Animated.SharedValue<number>;
  onPress: (status: number) => void;
}) {
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
        <Box paddingHorizontal="x3" style={{ transform: [{ translateY: -px(10) }] }}>
          <Text variant="p1" color="white">
            第三方登录
          </Text>
        </Box>
        <Box backgroundColor="border" height={1} width={px(55)} />
      </Flex>
      <Flex marginTop="x3" justifyContent="center">
        <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(0)}>
          <Image source={require('../../../assets/weichat.webp')} style={{ width: ICON_SIZE, height: ICON_SIZE }} />
        </TouchableOpacity>
        <Box width={px(85)} />
        <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(0)}>
          <Image source={require('../../../assets/qq.webp')} style={{ width: ICON_SIZE, height: ICON_SIZE }} />
        </TouchableOpacity>
      </Flex>
    </Animated.View>
  );
}
