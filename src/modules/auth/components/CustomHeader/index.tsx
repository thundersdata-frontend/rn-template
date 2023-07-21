import { FC, ReactNode } from 'react';
import { Platform } from 'react-native';

import { NavigationProp } from '@react-navigation/native';
import { Box, Flex, helpers, SvgIcon, useTheme } from '@td-design/react-native';

import { EnhancedTouchableOpacity } from '@/components/EnhancedTouchable';
import { AppTheme } from '@/theme';

const { px } = helpers;
export const CustomHeader: FC<{
  title?: ReactNode;
  transparent?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  navigation?: NavigationProp<AuthStackParamList>;
}> = ({ transparent = true, title, headerLeft, headerRight, navigation }) => {
  const theme = useTheme<AppTheme>();

  return (
    <Flex
      backgroundColor={transparent ? 'transparent' : 'background'}
      minHeight={px(60)}
      alignItems={'center'}
      paddingLeft={'x2'}
      marginTop={Platform.OS === 'android' ? 'x6' : 'x0'}
    >
      <Box flex={1}>
        {headerLeft ?? (
          <EnhancedTouchableOpacity activeOpacity={0.7} onPress={() => navigation?.canGoBack && navigation.goBack()}>
            <SvgIcon name="left" color={theme.colors.white} size={px(24)} />
          </EnhancedTouchableOpacity>
        )}
      </Box>
      <Box flex={2}>{title}</Box>
      <Box flex={1}>{headerRight}</Box>
    </Flex>
  );
};
