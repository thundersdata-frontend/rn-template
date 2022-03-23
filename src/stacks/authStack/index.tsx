import { FC } from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { SignIn } from 'modules/auth/screens/signIn';
import { Register } from 'modules/auth/screens/register';
import { ConfigPass } from 'modules/auth/screens/configPass';
import { ForgetPass } from 'modules/auth/screens/forgetPass';
import { Agreement } from 'modules/policy/screens/agreement';
import { Privacy } from 'modules/policy/screens/privacy';

const Stack = createStackNavigator();

export const AuthStack: FC<{ commonStackOptions: StackNavigationOptions }> = ({ commonStackOptions }) => {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={commonStackOptions}>
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
        name="ForgetPass"
        component={ForgetPass}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Agreement"
        component={Agreement}
        options={{
          headerTitle: '用户协议',
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerTitle: '隐私政策',
        }}
      />
    </Stack.Navigator>
  );
};
