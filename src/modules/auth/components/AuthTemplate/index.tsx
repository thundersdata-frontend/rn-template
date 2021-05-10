/**
 * 通过手机号登录时，设置登录密码
 */
import React, { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useDerivedValue } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Text } from 'components/Text';
import { Container } from '../Container';
import { CustomHeader } from '../CustomHeader';
import { AppTheme } from 'theme';

const springConfig = {
  mass: 1,
  damping: 15,
  stiffness: 120,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

export const AuthTemplate: FC<{
  title: string;
  subtitle?: string;
  navigation: StackNavigationProp<AuthStackParamList>;
}> = ({ title, subtitle, children, navigation }) => {
  const theme = useTheme<AppTheme>();
  const styles = StyleSheet.create({
    container: {
      paddingBottom: 120,
    },
    card: {
      backgroundColor: theme.colors.app_background,
      borderRadius: 20,
      marginHorizontal: 18,
      paddingBottom: 20,
      paddingHorizontal: 18,
      paddingTop: 32,
    },
    textWrap: {
      marginHorizontal: 30,
      marginTop: 40,
    },
  });

  const animated = useSharedValue<number>(0);

  useEffect(() => {
    animated.value = 1;
  }, [animated]);

  const animation = useDerivedValue(() => (animated.value ? withSpring(1, springConfig) : withSpring(0, springConfig)));
  const style = useAnimatedStyle(() => {
    const translateY = mix(animation.value, 700, 30);
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Container>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <CustomHeader {...{ navigation }} />
        <View style={styles.textWrap}>
          <Text variant="authTitle">{title}</Text>
          {subtitle && (
            <Text variant="authSubTitle" marginTop="m">
              {subtitle}
            </Text>
          )}
        </View>
        <Animated.View style={[styles.card, style]}>{children}</Animated.View>
      </KeyboardAwareScrollView>
    </Container>
  );
};
