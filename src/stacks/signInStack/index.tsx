import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from '@ant-design/react-native';
import zhCN from '@ant-design/react-native/es/locale-provider/zh_CN';

import SignIn from '../../screens/signIn';
import { Color, Size } from '../../config';

const Stack = createStackNavigator();
export const SignInStack = () => {
  return (
    <Provider
      locale={zhCN}
      theme={{
        brand_primary: Color.primary,
        activeTextColor: Color.primary,
        tabs_color: Color.primary,
        color_text_placeholder: Color.helpTextColor,
        border_color_base: Color.borderColor,
        font_size_heading: Size.px(14),
        list_item_height: Size.px(54),
        tabs_height: Size.px(36)
      }}>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ header: () => null }}>
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </Provider>
  );
};
