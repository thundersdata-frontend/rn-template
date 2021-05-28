import { Dimensions } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import { AppTheme } from 'theme';

const { width } = Dimensions.get('window');
export function Logo({ animation }: { animation: Animated.SharedValue<number> }) {
  const theme = useTheme<AppTheme>();

  const wrapStyle = useAnimatedStyle(() => ({
    marginBottom: 25,
    marginTop: mix(animation.value, 120, 55),
  }));

  const imageStyle = useAnimatedStyle(() => ({
    left: mix(animation.value, (width - 72) / 2, 25),
  }));

  const textStyle = useAnimatedStyle(() => ({
    left: mix(animation.value, (width - 200) / 2, 25),
  }));

  return (
    <Animated.View style={wrapStyle}>
      <Animated.Image
        source={require('../../../assets/logo.webp')}
        style={[
          {
            width: 72,
            height: 72,
            marginBottom: 20,
          },
          imageStyle,
        ]}
      />
      <Animated.Text
        style={[
          {
            fontSize: 23,
            lineHeight: 32,
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
