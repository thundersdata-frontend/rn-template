import React from 'react';

import { Flex, helpers, Text } from '@td-design/react-native';

import { Contact } from './data';

interface ContactCellProps {
  contact: Contact;
}

const ContactCell = ({ contact }: ContactCellProps) => {
  return (
    <Flex backgroundColor={'white'} paddingLeft={'x2'} flex={1} alignItems={'center'}>
      <Text fontSize={helpers.px(18)}>{contact.firstName} </Text>
      <Text fontSize={helpers.px(18)} fontWeight={'bold'}>
        {contact.lastName}
      </Text>
    </Flex>
  );
};

export default ContactCell;
