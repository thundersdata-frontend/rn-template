import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useIsConfirmed, useIsSignedIn, useIsSignedOut } from '@/contexts/AuthContext';
import { ConfigPass } from '@/modules/auth/screens/configPass';
import { ForgetPass } from '@/modules/auth/screens/forgetPass';
import { Register } from '@/modules/auth/screens/register';
import { SignIn } from '@/modules/auth/screens/signIn';
import { LineChartDemo } from '@/modules/charts/screens/line';
import { EchartsRoot } from '@/modules/charts/screens/main';
import { MapChartDemo } from '@/modules/charts/screens/map';
import { ContactsDemo } from '@/modules/homepage/screens/contacts';
import { FlashListDemo } from '@/modules/homepage/screens/flashlist';
import { FlashListDemo1 } from '@/modules/homepage/screens/flashlist/demo1';
import { FlashListDemo2 } from '@/modules/homepage/screens/flashlist/demo2';
import { RefreshFlatListDemo } from '@/modules/homepage/screens/flashlist/demo3';
import { LocalModelDemo } from '@/modules/homepage/screens/localmodel';
import { LongForm } from '@/modules/homepage/screens/longform';
import { NavigationModal } from '@/modules/homepage/screens/modal';
import { LocalImageDemo } from '@/modules/homepage/screens/pictures/demo1';
import { OnlineImageDemo } from '@/modules/homepage/screens/pictures/demo2';
import { WaterfallListDemo } from '@/modules/homepage/screens/waterfall';
import { Agreement } from '@/modules/policy/screens/agreement';
import { Privacy } from '@/modules/policy/screens/privacy';
import { PrivacyConfirm } from '@/modules/policy/screens/privacyConfirm';
import { ModifyPassword } from '@/modules/user/screens/modifyPass';
import { Settings } from '@/modules/user/screens/settings';
import { TabStack } from '@/stacks/tabStack';

const SignedInScreens = {
  Tab: {
    screen: TabStack,
    options: {
      headerShown: false,
    },
  },
  EchartsDemo: {
    screen: EchartsRoot,
    options: {
      title: '图表展示',
    },
  },
  LineChartDemo: {
    screen: LineChartDemo,
    options: {
      title: '折线图',
    },
  },
  MapChartDemo: {
    screen: MapChartDemo,
    options: {
      title: '山东地图',
    },
  },
  LocalModelDemo: {
    screen: LocalModelDemo,
    options: {
      title: '局部共享数据示例',
    },
  },
  LongFormDemo: {
    screen: LongForm,
    options: {
      title: '长表单示例',
    },
  },
  FlashListDemo: {
    screen: FlashListDemo,
    options: {
      title: 'FlashListDemo示例',
    },
  },
  FlashListDemo1: {
    screen: FlashListDemo1,
    options: {
      title: 'FlashListDemo1示例',
    },
  },
  FlashListDemo2: {
    screen: FlashListDemo2,
    options: {
      title: 'FlashListDemo2示例',
    },
  },
  RefreshFlatListDemo: {
    screen: RefreshFlatListDemo,
    options: {
      title: 'RefreshFlatListDemo示例',
    },
  },
  WaterfallListDemo: {
    screen: WaterfallListDemo,
    options: {
      title: 'WaterfallListDemo示例',
    },
  },
  ContactsDemo: {
    screen: ContactsDemo,
    options: {
      title: 'ContactsDemo示例',
    },
  },
  LocalImageDemo: {
    screen: LocalImageDemo,
    options: {
      title: '本地图片示例',
    },
  },
  OnlineImageDemo: {
    screen: OnlineImageDemo,
    options: {
      title: '网络图片示例',
    },
  },
  Settings: {
    screen: Settings,
    options: {
      title: '系统设置',
    },
  },
  ModifyPassword: {
    screen: ModifyPassword,
    options: {
      title: '修改密码',
    },
  },
  NavigationModal: {
    screen: NavigationModal,
    options: {
      headerShown: false,
      presentation: 'transparentModal',
      animation: 'slide_from_bottom',
      animationDuration: 200,
      animationTypeForReplace: 'pop',
    },
  },
};

const RootStack = createNativeStackNavigator({
  initialRouteName: 'PrivacyConfirm',
  screenOptions: {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    headerTitleAlign: 'center',
    animation: 'slide_from_right',
    animationDuration: 200,
  },
  screens: {},
  groups: {
    Confirmed: {
      if: useIsConfirmed,
      screenOptions: {
        headerShown: false,
      },
      screens: {
        PrivacyConfirm,
      },
    },
    SignedIn: {
      if: useIsSignedIn,
      screenOptions: {
        presentation: 'card',
      },
      screens: SignedInScreens,
    },
    SignedOut: {
      if: useIsSignedOut,
      screenOptions: {
        headerShown: false,
        presentation: 'card',
      },
      screens: {
        SignIn,
        ConfigPass,
        ForgetPass,
        Register,
      },
    },
    Common: {
      screens: {
        Agreement: {
          screen: Agreement,
          options: {
            title: '用户协议',
          },
        },
        Privacy: {
          screen: Privacy,
          options: {
            title: '隐私政策',
          },
        },
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default () => {
  return (
    <Navigation
      linking={{
        prefixes: ['rntemplate://'], // 可以自己加上自己的域名
      }}
    />
  );
};

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
