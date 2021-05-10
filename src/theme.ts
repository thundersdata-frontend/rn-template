import { theme } from '@td-design/react-native';

const { lightTheme: defaultLightTheme, darkTheme: defaultDarkTheme } = theme;

export const lightTheme = {
  ...defaultLightTheme,
  colors: {
    ...defaultLightTheme.colors,
    primary: '#3171F0',
    divide_line: 'rgba(255, 255, 255, 0.16)',
  },
  textVariants: {
    ...defaultLightTheme.textVariants,
    /** 鉴权页面主标题 */
    authTitle: {
      color: 'primaryText_2',
      fontSize: 28,
      fontWeight: '500',
      lineHeight: 40,
    },
    /** 鉴权页面副标题 */
    authSubTitle: {
      color: 'primaryText_2',
      fontSize: 12,
      lineHeight: 17,
    },
    /** 鉴权页面主登录按钮 */
    primaryLoginBtn: {
      color: 'primary',
      fontSize: 16,
      lineHeight: 22,
    },
    /** 鉴权页面副登录按钮 */
    secondaryLoginBtn: {
      color: 'white',
      fontSize: 16,
      lineHeight: 22,
    },
    /** 登录页面第三方登录提示文字 */
    loginDivider: {
      fontSize: 14,
      lineHeight: 20,
      color: 'white',
    },
    /** 登录页面忘记密码 */
    forgetPass: {
      color: 'supportText_1',
      fontSize: 14,
      lineHeight: 20,
    },
    /** 登录页面隐私政策 */
    policy: {
      color: 'supportText_1',
      fontSize: 12,
      lineHeight: 17,
    },
  },
};

export type AppTheme = typeof lightTheme;

export const darkTheme: AppTheme = {
  ...defaultDarkTheme,
  colors: {
    ...defaultDarkTheme.colors,
    primary: '#3171F0',
    divide_line: 'rgba(255, 255, 255, 0.16)',
  },
  textVariants: {
    ...defaultDarkTheme.textVariants,
    /** 鉴权页面主标题 */
    authTitle: {
      color: 'primaryText_2',
      fontSize: 28,
      fontWeight: '500',
      lineHeight: 40,
    },
    /** 鉴权页面副标题 */
    authSubTitle: {
      color: 'primaryText_2',
      fontSize: 12,
      lineHeight: 17,
    },
    /** 鉴权页面主登录按钮 */
    primaryLoginBtn: {
      color: 'primary',
      fontSize: 16,
      lineHeight: 22,
    },
    /** 鉴权页面副登录按钮 */
    secondaryLoginBtn: {
      color: 'white',
      fontSize: 16,
      lineHeight: 22,
    },
    /** 登录页面第三方登录提示文字 */
    loginDivider: {
      fontSize: 14,
      lineHeight: 20,
      color: 'white',
    },
    /** 登录页面忘记密码 */
    forgetPass: {
      color: 'supportText_1',
      fontSize: 14,
      lineHeight: 20,
    },
    /** 登录页面隐私政策 */
    policy: {
      color: 'supportText_1',
      fontSize: 12,
      lineHeight: 17,
    },
  },
};
