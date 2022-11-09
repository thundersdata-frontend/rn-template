import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConfigPass } from 'modules/auth/screens/configPass';
import { ForgetPass } from 'modules/auth/screens/forgetPass';
import { Register } from 'modules/auth/screens/register';
// ----- 登录鉴权相关页面 START ---------------------------------------------------------------------------
import { SignIn } from 'modules/auth/screens/signIn';
import { LineChart } from 'modules/charts/screens/line';
import { EchartsRoot } from 'modules/charts/screens/main';
import { MapChart } from 'modules/charts/screens/map';
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
// ----- 登录鉴权相关页面 END ---------------------------------------------------------------------------
// ----- 登录后相关页面 START ---------------------------------------------------------------------------
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
      title: '图表展示',
    },
  },
  {
    name: 'LineChart',
    component: LineChart,
    options: {
      title: '折线图',
    },
  },
  {
    name: 'MapChart',
    component: MapChart,
    options: {
      title: '山东地图',
    },
  },
  {
    name: 'LocalModelDemo',
    component: LocalModelDemo,
    options: {
      title: '局部共享数据示例',
    },
  },
  {
    name: 'RecyclerListDemo',
    component: RecyclerListDemo,
    options: {
      title: 'RecyclerListView示例',
    },
  },
  {
    name: 'RecyclerListDemo1',
    component: RecyclerListDemo1,
    options: {
      title: 'RLV示例1',
    },
  },
  {
    name: 'RecyclerListDemo2',
    component: RecyclerListDemo2,
    options: {
      title: 'RLV示例2',
    },
  },
  {
    name: 'RecyclerListDemo3',
    component: RecyclerListDemo3,
    options: {
      title: 'RLV示例3',
    },
  },
  {
    name: 'RecyclerListDemo4',
    component: RecyclerListDemo4,
    options: {
      title: 'RLV示例4',
    },
  },
  {
    name: 'Settings',
    component: Settings,
    options: {
      title: '系统设置',
    },
  },
  {
    name: 'ModifyPassword',
    component: ModifyPassword,
    options: {
      title: '修改密码',
    },
  },
];

const MODAL_SCREENS = [
  {
    name: 'Agreement',
    component: Agreement,
    options: {
      title: '用户协议',
    },
  },
  {
    name: 'Privacy',
    component: Privacy,
    options: {
      title: '隐私政策',
    },
  },
];

const Stack = createNativeStackNavigator();

export default () => {
  useStackService.useModel();

  const { confirmed, signedIn } = storageService;
  return (
    <Stack.Navigator
      initialRouteName={confirmed ? (signedIn ? 'Tab' : 'SignIn') : 'PrivacyConfirm'}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        animationDuration: 400,
      }}
    >
      {!confirmed && <Stack.Screen name="PrivacyConfirm" component={PrivacyConfirm} options={{ headerShown: false }} />}
      {signedIn ? (
        <Stack.Group
          screenOptions={{
            presentation: 'card',
          }}
        >
          {MAIN_SCREENS.map(screen => (
            <Stack.Screen key={screen.name} {...screen} />
          ))}
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ headerShown: false, presentation: 'card' }}>
          {AUTH_SCREENS.map(screen => (
            <Stack.Screen key={screen.name} {...screen} />
          ))}
        </Stack.Group>
      )}
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}
      >
        {MODAL_SCREENS.map(screen => (
          <Stack.Screen key={screen.name} {...screen} />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
};
