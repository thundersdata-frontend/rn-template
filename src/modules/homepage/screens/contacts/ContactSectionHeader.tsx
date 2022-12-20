import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ContactSectionHeaderProps {
  title: string;
}

const ContactSectionHeader = ({ title }: ContactSectionHeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default ContactSectionHeader;

const styles = StyleSheet.create({
  headerTitle: {
    paddingLeft: 10,
  },
  header: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    justifyContent: 'center',
  },
});
