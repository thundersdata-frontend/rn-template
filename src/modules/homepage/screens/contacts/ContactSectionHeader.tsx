import React from 'react';

import { Box, Text } from '@td-design/react-native';

interface ContactSectionHeaderProps {
  title: string;
}

const ContactSectionHeader = ({ title }: ContactSectionHeaderProps) => {
  return (
    <Box flex={1} justifyContent={'center'} backgroundColor={'white'}>
      <Text paddingLeft={'x2'}>{title}</Text>
    </Box>
  );
};

export default ContactSectionHeader;
