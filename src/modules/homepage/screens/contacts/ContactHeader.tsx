import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ContactHeader = () => {
  return (
    <View style={styles.headerTitle}>
      <Text>My contacts</Text>
    </View>
  );
};

export default ContactHeader;

const styles = StyleSheet.create({
  headerTitle: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
  },
});
