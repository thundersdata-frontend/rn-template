import { FC, ReactNode } from 'react';
import { Animated, TextStyle, TouchableOpacity } from 'react-native';
import { Flex, helpers, SvgIcon, Box, Text } from '@td-design/react-native';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from 'theme';
import { StackHeaderProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { px } = helpers;

export const CustomHeader: FC<StackHeaderProps> = ({ navigation, options }) => {
  const theme = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();
  const {
    headerTitle,
    headerTitleAlign,
    headerTitleStyle,
    headerTitleContainerStyle,
    headerLeft,
    headerLeftContainerStyle,
    headerRight,
    headerRightContainerStyle,
    headerTransparent,
  } = options || {};

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
      minHeight={px(54)}
      justifyContent="center"
      style={{ marginTop: insets.top }}
    >
      <Animated.View style={[{ flex: 1, alignItems: 'flex-start' }, headerLeftContainerStyle]}>
        {headerLeftComp}
      </Animated.View>
      <Animated.View
        style={[
          {
            flex: 2,
            justifyContent: 'center',
            alignItems: headerTitleAlign === 'left' ? 'flex-start' : 'center',
          },
          headerTitleContainerStyle,
        ]}
      >
        <Text variant="h1" color="gray500" textAlign={'center'} style={headerTitleStyle as TextStyle}>
          {headerTitle}
        </Text>
      </Animated.View>
      <Animated.View style={[{ flex: 1, alignItems: 'flex-end' }, headerRightContainerStyle]}>
        {options?.headerRight?.({}) ?? headerRight}
      </Animated.View>
    </Flex>
  );
};
