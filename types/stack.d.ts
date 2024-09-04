type CommonStackParamList = {
  Privacy: undefined;
  Agreement: undefined;
  NavigationModal: undefined;
};

type AuthStackParamList = {
  SignIn: undefined;
  ConfigPass: undefined;
  ForgetPass: undefined;
  Register: undefined;
  ModifyPasswordResult: undefined;
};

type MainStackParamList = {
  Tab: undefined;
  Homepage: undefined;
  IndexBarDemo: undefined;
  LocalModelDemo: undefined;
  FlashListDemo: undefined;
  FlashListDemo1: undefined;
  FlashListDemo2: undefined;
  FlashListDemo3: undefined;
  GetDetailDemo1: undefined;
  LongFormDemo: undefined;
  RefreshFlatListDemo: undefined;
  WaterfallListDemo: undefined;
  ContactsDemo: undefined;
  LocalImageDemo: undefined;
  OnlineImageDemo: undefined;
  Mine: undefined;
  Address: undefined;
  EchartsDemo: undefined;
  LineChartDemo: undefined;
  MapChartDemo: undefined;
  Settings: undefined;
  ModifyPassword: undefined;
  ModifyPasswordResult: undefined;
  ImageCrop: {
    file: any;
    width?: number;
    height?: number;
    callback?: (file: any) => Promise<void>;
  };
  TextDemo: undefined;
  NotFound: undefined;
  LinkingFormDemo: {
    username: string;
    password: string;
  };
  DetailDemo: {
    id: string;
  };
  TabListDemo: undefined;
};

type AppParamList = AuthStackParamList & MainStackParamList & CommonStackParamList;
