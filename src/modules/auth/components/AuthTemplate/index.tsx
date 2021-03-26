/**
 * 通过手机号登录时，设置登录密码
 */
import React, { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { SpringUtils } from 'react-native-reanimated';
import { mix, useValue, withSpringTransition } from 'react-native-redash';

import Container from 'modules/auth/components/Container';

const AuthTemplate: FC<{ title: string; subtitle?: string }> = ({ title, subtitle, children }) => {
  const animated = useValue<number>(0);

  useEffect(() => {
    animated.setValue(1);
  }, [animated]);

  const transition = withSpringTransition(animated, {
    ...SpringUtils.makeDefaultConfig(),
    damping: 16,
  });
  const translateY = mix(transition, 700, 40);

  return (
    <Container>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>{children}</Animated.View>
    </Container>
  );
};

export default AuthTemplate;

const styles = StyleSheet.create({
  textWrap: {
    marginTop: 125,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 28,
    lineHeight: 40,
    color: '#fff',
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 17,
    color: '#fff',
    marginTop: 10,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#fff',
    marginHorizontal: 18,
    paddingHorizontal: 18,
    paddingTop: 32,
    paddingBottom: 20,
  },
  btn: {
    backgroundColor: '#3171F0',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
