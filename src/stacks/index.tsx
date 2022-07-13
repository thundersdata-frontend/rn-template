import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { CustomHeader } from 'components';
// ----- 登录鉴权相关页面 START ---------------------------------------------------------------------------
import { ConfigPass } from 'modules/auth/screens/configPass';
import { ForgetPass } from 'modules/auth/screens/forgetPass';
import { Register } from 'modules/auth/screens/register';
import { SignIn } from 'modules/auth/screens/signIn';
// ----- 登录鉴权相关页面 END ---------------------------------------------------------------------------
// ----- 登录后相关页面 START ---------------------------------------------------------------------------
import { LineChart } from 'modules/charts/screens/line';
import { EchartsRoot } from 'modules/charts/screens/main';
import { MapChart } from 'modules/charts/screens/map';
import { IndexBarDemo } from 'modules/homepage/screens/indexbar';
import { LocalModelDemo } from 'modules/homepage/screens/localmodel';
import { RecyclerListDemo } from 'modules/homepage/screens/recyclerlist';
import { RecyclerListDemo1 } from 'modules/homepage/screens/recyclerlist/demo1';
import { RecyclerListDemo2 } from 'modules/homepage/screens/recyclerlist/demo2';
import { RecyclerListDemo3 } from 'modules/homepage/screens/recyclerlist/demo3';
import { RecyclerListDemo4 } from 'modules/homepage/screens/recyclerlist/demo4';
import { Agreement } from 'modules/policy/screens/agreement';
import { Privacy } from 'modules/policy/screens/privacy';
import { PrivacyConfirm } from 'modules/policy/screens/privacyConfirm';
import { ModifyPassword } from 'modules/user/screens/modifyPass';
import { Settings } from 'modules/user/screens/settings';
import { storageService } from 'services/StorageService';
import { TabStack } from 'stacks/tabStack';

import useStackService from './useStackService';
// ----- 登录后相关页面 START ---------------------------------------------------------------------------

const AUTH_SCREENS = [
  {
    name: 'SignIn',
    component: SignIn,
  },
  {
    name: 'ConfigPass',
    component: ConfigPass,
  },
  {
    name: 'ForgetPass',
    component: ForgetPass,
  },
  {
    name: 'Register',
    component: Register,
  },
];

const MAIN_SCREENS = [
  {
    name: 'Tab',
    component: TabStack,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Echarts',
    component: EchartsRoot,
    options: {
      headerTitle: '图表展示',
    },
  },
  {
    name: 'LineChart',
    component: LineChart,
    options: {
      headerTitle: '折线图',
    },
  },
  {
    name: 'MapChart',
    component: MapChart,
    options: {
      headerTitle: '山东地图',
    },
  },
  {
    name: 'IndexBarDemo',
    component: IndexBarDemo,
    options: {
      headerTitle: '通讯录示例',
    },
  },
  {
    name: 'LocalModelDemo',
    component: LocalModelDemo,
    options: {
      headerTitle: '局部共享数据示例',
    },
  },
  {
    name: 'RecyclerListDemo',
    component: RecyclerListDemo,
    options: {
      headerTitle: 'RecyclerListView示例',
    },
  },
  {
    name: 'RecyclerListDemo1',
    component: RecyclerListDemo1,
    options: {
      headerTitle: 'RLV示例1',
    },
  },
  {
    name: 'RecyclerListDemo2',
    component: RecyclerListDemo2,
    options: {
      headerTitle: 'RLV示例2',
    },
  },
  {
    name: 'RecyclerListDemo3',
    component: RecyclerListDemo3,
    options: {
      headerTitle: 'RLV示例3',
    },
  },
  {
    name: 'RecyclerListDemo4',
    component: RecyclerListDemo4,
    options: {
      headerTitle: 'RLV示例4',
    },
  },
  {
    name: 'Settings',
    component: Settings,
    options: {
      headerTitle: '系统设置',
    },
  },
  {
    name: 'ModifyPassword',
    component: ModifyPassword,
    options: {
      headerTitle: '修改密码',
    },
  },
];

const MODAL_SCREENS = [
  {
    name: 'Agreement',
    component: Agreement,
    options: {
      headerTitle: '用户协议',
    },
  },
  {
    name: 'Privacy',
    component: Privacy,
    options: {
      headerTitle: '隐私政策',
    },
  },
];

const Stack = createStackNavigator();

export default () => {
  useStackService.useModel();

  const commonStackOptions: StackNavigationOptions = {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  const { confirmed, signedIn } = storageService;
  return (
    <Stack.Navigator
      initialRouteName={confirmed ? (signedIn ? 'Tab' : 'SignIn') : 'PrivacyConfirm'}
      screenOptions={commonStackOptions}
    >
      {!confirmed && <Stack.Screen name="PrivacyConfirm" component={PrivacyConfirm} />}
      {signedIn ? (
        <Stack.Group
          screenOptions={{
            header: props => <CustomHeader {...props} />,
          }}
        >
          {MAIN_SCREENS.map(screen => (
            <Stack.Screen key={screen.name} {...screen} />
          ))}
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ headerShown: false }}>
          {AUTH_SCREENS.map(screen => (
            <Stack.Screen key={screen.name} {...screen} />
          ))}
        </Stack.Group>
      )}
      <Stack.Group
        screenOptions={{
          header: props => <CustomHeader {...props} headerStyle={{ marginTop: 0 }} />,
          presentation: 'modal',
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      >
        {MODAL_SCREENS.map(screen => (
          <Stack.Screen key={screen.name} {...screen} />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
};
