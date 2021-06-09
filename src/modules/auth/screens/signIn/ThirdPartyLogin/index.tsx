import { Dimensions, Image, View, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

import { Box } from 'components/Box';
import { Text } from 'components/Text';

const { width } = Dimensions.get('window');
export function ThirdPartyLogin({
  animation,
  onPress,
}: {
  animation: Animated.SharedValue<number>;
  onPress: (status: number) => void;
}) {
  const style = useAnimatedStyle(() => ({
    height: 110,
    transform: [
      {
        translateY: mix(animation.value, 0, 20),
      },
    ],
  }));
  return (
    <Animated.View style={style}>
      <View
        style={{
          width,
          paddingHorizontal: 60,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Box backgroundColor="border" height={1} width={55} />
        <View style={{ paddingHorizontal: 10, transform: [{ translateY: -10 }] }}>
          <Text variant="loginDivider">第三方登录</Text>
        </View>
        <Box backgroundColor="border" height={1} width={55} />
      </View>
      <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(0)}>
          <Image source={require('../../../assets/weichat.webp')} style={{ width: 48, height: 48 }} />
        </TouchableOpacity>
        <View style={{ width: 85 }} />
        <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(0)}>
          <Image source={require('../../../assets/qq.webp')} style={{ width: 48, height: 48 }} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
