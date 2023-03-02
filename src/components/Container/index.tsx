import * as React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@td-design/react-native';

import { AppTheme } from '@/theme';

export const Container: React.FC<{ hasHeader?: boolean; backgroundColor?: string }> = ({
  hasHeader = true,
  children,
  backgroundColor,
}) => {
  const theme = useTheme<AppTheme>();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor || theme.colors.white,
      position: 'relative',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={hasHeader ? ['left', 'right', 'bottom'] : ['left', 'right', 'top']}>
      <StatusBar
        barStyle={theme.theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
      />
      {children}
    </SafeAreaView>
  );
};
