import React, { FC } from 'react';
import { Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Flex, Icon } from '@td-design/react-native';
import { AppTheme } from 'theme';

export const ErrorMessage: FC<{ text: string }> = ({ text }) => {
  const theme = useTheme<AppTheme>();

  if (!text) return null;
  return (
    <Flex>
      <Icon name="warning" size={14} color={theme.colors.warn} />
      <Text style={{ fontSize: 12, lineHeight: 20, color: theme.colors.warn }}>{text}</Text>
    </Flex>
  );
};
