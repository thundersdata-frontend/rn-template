import React from 'react';

import { Box, Text } from '@td-design/react-native';

const ContactHeader = () => {
  return (
    <Box backgroundColor={'white'} paddingHorizontal={'x2'} flex={1} justifyContent={'center'}>
      <Text>My contacts</Text>
    </Box>
  );
};

export default ContactHeader;
