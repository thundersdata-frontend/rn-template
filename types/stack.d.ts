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
  RecyclerListDemo: undefined;
  RecyclerListDemo1: undefined;
  RecyclerListDemo2: undefined;
  RecyclerListDemo3: undefined;
  RecyclerListDemo4: undefined;
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
