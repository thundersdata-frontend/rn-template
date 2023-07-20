import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { helpers, Text, useTheme } from '@td-design/react-native';

import { Homepage } from '@/modules/homepage/screens';
import { Mine } from '@/modules/user/screens';
import { AppTheme } from '@/theme';

import Icon, { IconNames } from '../../components/Icon';

const { px } = helpers;
const Tab = createBottomTabNavigator();
const tabItems: { name: string; title?: string; label: string; icon: IconNames; component: () => JSX.Element }[] = [
  {
    name: 'Homepage',
    component: Homepage,
    label: '首页',
    icon: 'sms',
    title: '首页',
  },
  {
    name: 'Mine',
    component: Mine,
    label: '我的',
    icon: 'user',
    title: '我的',
  },
];

export const TabStack = () => {
  const theme = useTheme<AppTheme>();
  return (
    <Tab.Navigator
      initialRouteName="Homepage"
      screenOptions={{
        // 懒加载TabScreen
        lazy: true,
        headerTitleAlign: 'center',
        // 不显示TabScreen的header
        headerShown: false,
        tabBarStyle: {
          paddingTop: px(4),
        },
      }}
    >
      {tabItems.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item.title || item.label,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? theme.colors.gray500 : theme.colors.gray300,
                  fontSize: px(12),
                }}
              >
                {item?.label}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Icon name={item.icon} size={px(20)} color={focused ? theme.colors.gray500 : theme.colors.gray300} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
