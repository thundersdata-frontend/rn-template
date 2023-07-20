import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Box, Text, useTheme } from '@td-design/react-native';

import { AppTheme } from '@/theme';

import { Container } from '../Container';

export function Fallback() {
  const theme = useTheme<AppTheme>();
  return (
    <Container>
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator animating size="large" color={theme.colors.primary200} />
        <Text>页面加载中...</Text>
      </Box>
    </Container>
  );
}
