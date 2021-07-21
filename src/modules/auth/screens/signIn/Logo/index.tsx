import { useTheme } from '@shopify/restyle';
import { helpers } from '@td-design/react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import { AppTheme } from 'theme';

const { px, deviceWidth } = helpers;
export function Logo({ animation }: { animation: Animated.SharedValue<number> }) {
  const theme = useTheme<AppTheme>();

  const wrapStyle = useAnimatedStyle(() => ({
    marginTop: mix(animation.value, 120, 55),
  }));

  const imageStyle = useAnimatedStyle(() => ({
    left: mix(animation.value, (deviceWidth - 72) / 2, 25),
  }));

  const textStyle = useAnimatedStyle(() => ({
    left: mix(animation.value, (deviceWidth - 200) / 2, 25),
  }));

  return (
    <Animated.View style={[{ marginBottom: px(25) }, wrapStyle]}>
      <Animated.Image
        source={require('../../../assets/logo.webp')}
        style={[
          {
            width: px(72),
            height: px(72),
            marginBottom: px(20),
          },
          imageStyle,
        ]}
      />
      <Animated.Text
        style={[
          {
            fontSize: px(24),
            lineHeight: px(32),
            color: theme.colors.white,
          },
          textStyle,
        ]}
      >
        欢迎来到雷数科技！
      </Animated.Text>
    </Animated.View>
  );
}
