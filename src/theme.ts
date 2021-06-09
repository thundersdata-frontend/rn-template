import { theme } from '@td-design/react-native';

export const lightTheme = {
  ...theme.lightTheme,
  colors: {
    ...theme.lightTheme.colors,
  },
  textVariants: {
    ...theme.lightTheme.textVariants,
    /** 鉴权页面主标题 */
    authTitle: {
      color: 'white',
      fontSize: 28,
      fontWeight: '500',
      lineHeight: 40,
    },
    /** 鉴权页面副标题 */
    authSubTitle: {
      color: 'white',
      fontSize: 12,
      lineHeight: 17,
    },
    /** 鉴权页面主登录按钮 */
    primaryLoginBtn: {
      color: 'primary200',
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
      color: 'gray300',
      fontSize: 14,
      lineHeight: 20,
    },
    /** 登录页面隐私政策 */
    policy: {
      color: 'gray300',
      fontSize: 12,
      lineHeight: 17,
    },
  },
};

export type AppTheme = typeof lightTheme;

export const darkTheme: AppTheme = {
  ...theme.darkTheme,
  colors: {
    ...theme.darkTheme.colors,
  },
  textVariants: {
    ...theme.darkTheme.textVariants,
    /** 鉴权页面主标题 */
    authTitle: {
      color: 'white',
      fontSize: 28,
      fontWeight: '500',
      lineHeight: 40,
    },
    /** 鉴权页面副标题 */
    authSubTitle: {
      color: 'white',
      fontSize: 12,
      lineHeight: 17,
    },
    /** 鉴权页面主登录按钮 */
    primaryLoginBtn: {
      color: 'primary200',
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
      color: 'gray300',
      fontSize: 14,
      lineHeight: 20,
    },
    /** 登录页面隐私政策 */
    policy: {
      color: 'gray300',
      fontSize: 12,
      lineHeight: 17,
    },
  },
};
