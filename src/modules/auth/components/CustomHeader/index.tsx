import { FC, ReactNode } from 'react';
import { Platform, View, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from 'theme';

export const CustomHeader: FC<{
  title?: ReactNode;
  transparent?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  navigation?: StackNavigationProp<AuthStackParamList>;
}> = ({ transparent = true, title, headerLeft, headerRight, navigation }) => {
  const theme = useTheme<AppTheme>();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: transparent ? theme.colors.transparent : theme.colors.app_background,
      minHeight: 60,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 5,
      marginTop: Platform.OS === 'android' ? 24 : 0,
    },
    left: { flex: 1 },
    title: { flex: 2 },
    right: { flex: 1 },
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {headerLeft ?? (
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation?.canGoBack && navigation.goBack()}>
            <Icon name="left" color="#fff" size={24} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.title}>{title}</View>
      <View style={styles.right}>{headerRight}</View>
    </View>
  );
};
