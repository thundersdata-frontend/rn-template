import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Contact } from './data';

interface ContactCellProps {
  contact: Contact;
}

const ContactCell = ({ contact }: ContactCellProps) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.firstName}>{contact.firstName} </Text>
      <Text style={styles.lastName}>{contact.lastName}</Text>
    </View>
  );
};

export default ContactCell;

const styles = StyleSheet.create({
  rowContainer: {
    backgroundColor: 'white',
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstName: {
    fontSize: 18,
  },
  lastName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
