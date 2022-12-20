type CommonStackParamList = {
  Privacy: undefined;
  Agreement: undefined;
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
  WaterfallListDemo: undefined;
  ContactsDemo: undefined;
  Mine: undefined;
  Address: undefined;
  Echarts: undefined;
  LineChart: undefined;
  MapChart: undefined;
  Settings: undefined;
  ModifyPassword: undefined;
  ModifyPasswordResult: undefined;
};

type AppParamList = AuthStackParamList & MainStackParamList & CommonStackParamList;
