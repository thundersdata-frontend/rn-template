import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  NavigationScreenConfigProps,
  BottomTabNavigatorConfig,
  createMaterialTopTabNavigator,
  NavigationParams,
} from 'react-navigation';
import { defaultOptions, Colors, Size } from './config';
import Iconfont from './components/Iconfont';
// 登录
import SignIn from './screens/signIn';
// 我的
import Profile from './screens/profile';
// 修改密码
import EditPass from './screens/editPass';
// 忘记密码
import ForgetPass from './screens/forgetPass';
// 首页
import Home from './screens/home';
// 图表示例-普通
import NormalChart from './screens/charts/normal';
// 图表示例-地图
import MapChart from './screens/charts/map';

/* tab页底部的icon和label适配 */
const tabLabelIconConfig = {
  Home: {
    label: '首页',
    icon: 'home',
  },
  ChartDemo: {
    label: '图表示例',
    icon: 'analysis',
  },
  NormalChart: {
    label: '普通图表',
    icon: 'normalChart',
  },
  MapChart: {
    label: '地图示例',
    icon: 'mapChart',
  },
  Profile: {
    label: '我的',
    icon: 'mine',
  },
};

/* tab页的tabBarLabel配置 */
const tabNavigatorConfig: BottomTabNavigatorConfig = {
  initialRouteName: '',
  navigationOptions: (props: NavigationScreenConfigProps) => {
    const { navigation } = props;
    const { routeName } = navigation.state;
    const { label, icon } = tabLabelIconConfig[routeName];
    return {
      tabBarLabel: label,
      tabBarIcon: ({ tintColor }: { tintColor: string | null }) => (
        <Iconfont name={icon} color={tintColor!} size={Size.px(24)} />
      ),
    };
  },
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.grey,
    labelStyle: {
      marginBottom: Size.px(4),
    },
    style: {
      backgroundColor: Colors.white,
    },
  },
};

// 顶部tab的配置
const topTabNavigatorConfig: NavigationParams = {
  initialRouteName: '',
  navigationOptions: (props: NavigationScreenConfigProps) => {
    const { navigation } = props;
    const { routeName } = navigation.state;
    const { label } = tabLabelIconConfig[routeName];
    return {
      tabBarLabel: label,
    };
  },
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.black,
    style: {
      backgroundColor: Colors.white,
    },
    labelStyle: {
      fontSize: 14,
    },
    indicatorStyle: {
      backgroundColor: Colors.primary,
    },
  },
};

const ChartDemoTab = createMaterialTopTabNavigator(
  {
    NormalChart,
    MapChart,
  },
  {
    ...topTabNavigatorConfig,
    initialRouteName: 'NormalChart',
    lazy: true,
    backBehavior: 'none', // 回退行为
    swipeEnabled: false, // 不允许滑动切换Tab
  },
);

const HomeTab = createBottomTabNavigator(
  {
    Home,
    ChartDemo: {
      screen: ChartDemoTab,
    },
    Profile,
  },
  {
    ...tabNavigatorConfig,
    initialRouteName: 'Home',
  },
);
HomeTab.navigationOptions = (props: NavigationScreenConfigProps) => {
  const { navigation } = props;
  const { routeName } = navigation.state.routes[navigation.state.index];
  const { label } = tabLabelIconConfig[routeName];
  if (label && label !== '我的') {
    return {
      ...defaultOptions,
      headerRight: null,
      title: label,
      headerMode: 'none',
    };
  }
  return {
    header: null,
    headerMode: 'none',
  };
};

export const SignedIn = createStackNavigator(
  {
    HomeTab,
    EditPass,
  },
  {
    initialRouteName: 'HomeTab',
  },
);

/** 未登录的页面栈 */
export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      headerStyle: defaultOptions.headerStyle,
      header: null,
    },
  },
  ForgetPass: {
    screen: ForgetPass,
    navigationOptions: {
      headerStyle: defaultOptions.headerStyle,
      header: null,
    },
  },
});

export const createRootNavigator = (_signedIn = false) =>
  createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn,
      },
      SignedOut: {
        screen: SignedOut,
      },
    },
    {
      // initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
      initialRouteName: 'SignedIn',
    },
  );
