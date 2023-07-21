/**
 * 通过手机号登录时，设置登录密码
 */
import { FC, PropsWithChildren, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { KeyboardInsetsView } from '@sdcx/keyboard-insets';
import { Box, helpers, Text, useTheme } from '@td-design/react-native';

import { AppTheme } from '@/theme';

import { Container } from '../Container';
import { CustomHeader } from '../CustomHeader';

const springConfig = {
  mass: 1,
  damping: 15,
  stiffness: 120,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

const { px } = helpers;
export const AuthTemplate: FC<
  PropsWithChildren<{
    title: string;
    subtitle?: string;
  }>
> = ({ title, subtitle, children }) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const theme = useTheme<AppTheme>();
  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background,
      borderRadius: px(20),
      marginHorizontal: px(18),
      paddingBottom: px(20),
      paddingHorizontal: px(18),
      paddingTop: px(32),
    },
  });

  const animated = useSharedValue<number>(0);

  useEffect(() => {
    animated.value = 1;
  }, [animated]);

  const animation = useDerivedValue(() => (animated.value ? withSpring(1, springConfig) : withSpring(0, springConfig)));
  const style = useAnimatedStyle(() => {
    const translateY = mix(animation.value, 700, 0);
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Container>
      <CustomHeader {...{ navigation }} />
      <Box marginHorizontal={'x8'} marginVertical={'x5'}>
        <Text variant="h3" color="func50">
          {title}
        </Text>
        {subtitle && (
          <Text variant="p2" color="func50" marginTop="x3">
            {subtitle}
          </Text>
        )}
      </Box>
      <KeyboardInsetsView extraHeight={8}>
        <Animated.View style={[styles.card, style]}>{children}</Animated.View>
      </KeyboardInsetsView>
    </Container>
  );
};
