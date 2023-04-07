import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@td-design/react-native';
import { helpers, Text } from '@td-design/react-native';

import { Homepage } from '@/modules/homepage/screens';
import { Mine } from '@/modules/user/screens';
import { AppTheme } from '@/theme';

import Icon, { IconNames } from '../../components/Icon';

const { px } = helpers;

const TabLabel = ({ focused }: { focused: boolean }) => {
  const theme = useTheme<AppTheme>();
  return (
    <Text
      style={{
        color: focused ? theme.colors.gray500 : theme.colors.gray300,
        fontSize: px(12),
      }}
    >
      首页
    </Text>
  );
};

const TabIcon = ({ focused, icon }: { focused: boolean; icon: IconNames }) => {
  const theme = useTheme<AppTheme>();
  return <Icon name={icon} size={px(20)} color={focused ? theme.colors.gray500 : theme.colors.gray300} />;
};

export const TabStack = createBottomTabNavigator({
  initialRouteName: 'Homepage',
  screenOptions: {
    lazy: true,
    headerShown: false,
  },
  screens: {
    Homepage: {
      screen: Homepage,
      options: {
        tabBarLabel: ({ focused }: { focused: boolean }) => <TabLabel {...{ focused, label: '首页' }} />,
        tabBarIcon: ({ focused }: { focused: boolean }) => <TabIcon {...{ focused, icon: 'sms' }} />,
      },
    },
    Mine: {
      screen: Mine,
      options: {
        tabBarLabel: ({ focused }: { focused: boolean }) => <TabLabel {...{ focused, label: '我的' }} />,
        tabBarIcon: ({ focused }: { focused: boolean }) => <TabIcon {...{ focused, icon: 'user' }} />,
      },
    },
  },
});
