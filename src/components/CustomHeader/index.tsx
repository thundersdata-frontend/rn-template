import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import { Box, Flex, helpers, SvgIcon, Text } from '@td-design/react-native';
import { FC, ReactNode } from 'react';
import { Animated, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppTheme } from 'theme';

const { px } = helpers;

export const CustomHeader: FC<NativeStackHeaderProps & { headerStyle?: StyleProp<ViewStyle> }> = ({
  navigation,
  options,
  headerStyle,
}) => {
  const theme = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const { headerTitle, headerTitleAlign, headerTitleStyle, headerLeft, headerRight, headerTransparent } = options || {};

  let headerLeftComp: ReactNode = <Box />;
  if (headerLeft) {
    headerLeftComp = headerLeft;
  } else if (navigation.canGoBack()) {
    headerLeftComp = (
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation?.goBack()}>
        <SvgIcon name="left" color={headerTransparent ? theme.colors.white : theme.colors.gray500} size={px(28)} />
      </TouchableOpacity>
    );
  }

  return (
    <Flex
      paddingHorizontal="x2"
      backgroundColor={headerTransparent ? 'transparent' : 'background'}
      height={80}
      justifyContent="center"
      style={[{ paddingTop: insets.top }, headerStyle]}
    >
      <Animated.View style={[{ flex: 1, alignItems: 'flex-start' }]}>{headerLeftComp}</Animated.View>
      <Animated.View
        style={[
          {
            flex: 2,
            justifyContent: 'center',
            alignItems: headerTitleAlign === 'left' ? 'flex-start' : 'center',
          },
        ]}
      >
        <Text variant="h1" color="gray500" textAlign={'center'} style={headerTitleStyle as TextStyle}>
          {headerTitle}
        </Text>
      </Animated.View>
      <Animated.View style={[{ flex: 1, alignItems: 'flex-end' }]}>{headerRight?.({ canGoBack: true })}</Animated.View>
    </Flex>
  );
};
