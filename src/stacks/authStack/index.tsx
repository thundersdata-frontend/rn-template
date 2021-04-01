import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import SignIn from 'modules/auth/screens/signIn';
import ConfigPass from 'modules/auth/screens/configPass';
import BindPhone from 'modules/auth/screens/bindPhone';
import ForgetPass from 'modules/auth/screens/forgetPass';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ gestureEnabled: true }}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfigPass"
        component={ConfigPass}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BindPhone"
        component={BindPhone}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgetPass"
        component={ForgetPass}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
