import { FC } from 'react';

import { Flex, helpers, Text, useTheme } from '@td-design/react-native';

import Icon from '@/components/Icon';
import { AppTheme } from '@/theme';

const { px } = helpers;
export const ErrorMessage: FC<{ text: string }> = ({ text }) => {
  const theme = useTheme<AppTheme>();

  if (!text) return null;
  return (
    <Flex>
      <Icon name="warning" size={px(14)} color={theme.colors.func500} />
      <Text fontSize={px(12)} lineHeight={px(20)} color="func500">
        {text}
      </Text>
    </Flex>
  );
};
