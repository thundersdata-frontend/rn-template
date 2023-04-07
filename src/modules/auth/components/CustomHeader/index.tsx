import { FC, ReactNode } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@td-design/react-native';
import { helpers, SvgIcon } from '@td-design/react-native';

import { AppTheme } from '@/theme';

const { px } = helpers;
export const CustomHeader: FC<{
  title?: ReactNode;
  transparent?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
}> = ({ transparent = true, title, headerLeft, headerRight }) => {
  const navigation = useNavigation();
  const theme = useTheme<AppTheme>();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: transparent ? theme.colors.transparent : theme.colors.background,
      minHeight: px(60),
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: theme.spacing.x2,
      marginTop: Platform.OS === 'android' ? theme.spacing.x6 : 0,
    },
    left: { flex: 1 },
    title: { flex: 2 },
    right: { flex: 1 },
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {headerLeft ?? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
          >
            <SvgIcon name="left" color={theme.colors.white} size={px(24)} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.title}>{title}</View>
      <View style={styles.right}>{headerRight}</View>
    </View>
  );
};
