import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Mine({ navigation }: { navigation: NativeStackNavigationProp<MainStackParamList, 'Mine'> }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>123</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Address')}>
        <Text>去地址信息页面</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
