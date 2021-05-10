import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppTheme } from 'theme';

export const Container: React.FC<{ hasHeader?: boolean }> = ({ hasHeader = true, children }) => {
  const theme = useTheme<AppTheme>();
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.white },
  });

  return (
    <SafeAreaView style={styles.container} edges={hasHeader ? ['bottom', 'left', 'right'] : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {children}
    </SafeAreaView>
  );
};
