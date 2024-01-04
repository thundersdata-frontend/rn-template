import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PrivacyConfirm } from '@/modules/policy/screens/privacyConfirm';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName={'PrivacyConfirm'}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        animationDuration: 200,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="PrivacyConfirm" component={PrivacyConfirm} />
    </Stack.Navigator>
  );
}
