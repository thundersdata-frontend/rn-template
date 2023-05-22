import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<AppParamList> = {
  enabled: true,
  prefixes: ['rntemplate://'],
  config: {
    // 必须要配置一个initialRoute，否则从外部打开APP内某个页面之后，没有返回按钮
    // 另外，initialRoute必须要是无参的！
    initialRouteName: 'Tab',
    screens: {
      // 任何没有匹配成功的都会跳转到这个界面
      NotFound: '*',
      // Tab嵌套的页面配置需要这么写
      Tab: {
        screens: {
          Homepage: 'homepage',
          Mine: 'mine',
        },
      },
      // 无传参的页面的URL写法是: rntemplate://charts
      EchartsDemo: 'charts',
      // RESTFUL风格的URL传参写法是: rntemplate://detail/1
      DetailDemo: 'detail/:id',
      // 有传参的页面的URL写法是: rntemplate://form?username=test&password=test
      LinkingFormDemo: 'form',
    },
  },
};
