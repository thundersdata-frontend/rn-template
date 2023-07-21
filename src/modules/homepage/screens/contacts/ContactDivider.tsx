import React from 'react';

import { Box, helpers } from '@td-design/react-native';

import { Contact } from './data';

interface ContactDividerProps {
  leadingItem: Contact | string;
  trailingItem: Contact | string;
}

const ContactDivider = ({ leadingItem, trailingItem }: ContactDividerProps) => {
  if (typeof leadingItem === 'string' || typeof trailingItem === 'string') {
    return null;
  }
  return (
    <Box height={helpers.ONE_PIXEL} backgroundColor={'white'}>
      <Box marginHorizontal={'x2'} height={helpers.ONE_PIXEL} backgroundColor={'border'} />
    </Box>
  );
};

export default ContactDivider;
