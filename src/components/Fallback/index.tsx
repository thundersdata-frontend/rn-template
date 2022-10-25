import { useTheme } from '@shopify/restyle';
import { Text } from '@td-design/react-native';
import { Container } from 'components';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AppTheme } from 'theme';

export function Fallback() {
  const theme = useTheme<AppTheme>();
  return (
    <Container>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating size="large" color={theme.colors.primary200} />
        <Text>页面加载中...</Text>
      </View>
    </Container>
  );
}
