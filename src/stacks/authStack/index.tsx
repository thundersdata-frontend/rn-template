import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { createStackNavigator, StackHeaderLeftButtonProps, StackNavigationOptions } from '@react-navigation/stack';

import SignIn from 'modules/auth/screens/signIn';
import ConfigPass from 'modules/auth/screens/configPass';
import BindPhone from 'modules/auth/screens/bindPhone';
import ForgetPass from 'modules/auth/screens/forgetPass';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

const AuthStack = (screenOptions: StackNavigationOptions) => {
  return (
    <Stack.Navigator initialRouteName="SignIn" mode="card" headerMode="screen" screenOptions={screenOptions}>
      <Stack.Screen name="SignIn" component={SignIn} options={{ header: () => null }} />
      <Stack.Screen
        name="ConfigPass"
        component={ConfigPass}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: (props: StackHeaderLeftButtonProps) => (
            <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={{ marginLeft: 0, padding: 10 }}>
              <Icon name="left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="BindPhone"
        component={BindPhone}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: (props: StackHeaderLeftButtonProps) => (
            <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={{ marginLeft: 0, padding: 10 }}>
              <Icon name="left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ForgetPass"
        component={ForgetPass}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: (props: StackHeaderLeftButtonProps) => (
            <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={{ marginLeft: 0, padding: 10 }}>
              <Icon name="left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
