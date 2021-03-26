import { useUpdateAtom } from 'jotai/utils';
import authService from 'modules/auth/authService';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Homepage() {
  const updateAuth = useUpdateAtom(authService.authAtom);

  const logout = () => {
    updateAuth({ signedIn: false });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>我是首页</Text>
      </View>
      <TouchableOpacity
        onPress={logout}
        style={{
          marginVertical: 15,
          backgroundColor: '#3171F0',
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}
      >
        <Text>退出登录</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
