import { FC } from 'react';
import { Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Flex, helpers } from '@td-design/react-native';
import { AppTheme } from 'theme';
import { Icon } from 'components';

const { px } = helpers;
export const ErrorMessage: FC<{ text: string }> = ({ text }) => {
  const theme = useTheme<AppTheme>();

  if (!text) return null;
  return (
    <Flex>
      <Icon name="warning" size={px(14)} color={theme.colors.func500} />
      <Text style={{ fontSize: px(12), lineHeight: px(20), color: theme.colors.func500 }}>{text}</Text>
    </Flex>
  );
};
