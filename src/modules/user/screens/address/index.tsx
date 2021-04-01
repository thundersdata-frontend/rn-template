import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Address({ navigation }: { navigation: NativeStackNavigationProp<AuthStackParamList> }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>address</Text>
      </View>
    </SafeAreaView>
  );
}
