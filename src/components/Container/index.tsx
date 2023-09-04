import { FC, PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { SystemBars } from 'react-native-bars';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@td-design/react-native';

import { AppTheme } from '@/theme';

export const Container: FC<PropsWithChildren<{ hasHeader?: boolean; inTab?: boolean; backgroundColor?: string }>> = ({
  hasHeader = true,
  inTab = false,
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

  let edges: Edge[] = [];

  if (hasHeader) {
    edges = ['left', 'right', 'bottom'];
    if (inTab) {
      edges = ['left', 'right'];
    }
  } else {
    edges = ['left', 'right', 'top'];
  }

  return (
    <SafeAreaView style={styles.container} edges={edges}>
      <SystemBars animated barStyle={theme.theme === 'light' ? 'dark-content' : 'light-content'} />
      {children}
    </SafeAreaView>
  );
};
