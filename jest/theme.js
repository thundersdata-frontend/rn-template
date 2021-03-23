import { createTheme } from '@shopify/restyle';

export const baseFunctionPalette = {
  red: '#F4443C',
  orange: '#F86E21',
  green: '#52C41A',
  white: '#ffffff',
  black: '#000000',
  blue: '#005DFF',
  mediumBlue: '#1890FF',
  lightBlue: '#3AA3FF',
  yellow: '#FFD21D',
  lightRed: '#FBF5F5',
  lightOrange: '#FFF7E3',
  pink: '#ff00a1',
  twentyPercentBlack: 'rgba(0, 0, 0, 0.2)',
  lightPink: '#ECF4FF',
};

export const palette = {
  ...baseFunctionPalette,
  cyan: '#E5F1FF',
  dark: '#333333',
  lightDark: '#666666',
  gray: '#999999',
  mediumGray: '#CCCCCC',
  lightGray: '#F5F5F9',
  grayishGray: '#dddddd',
  darkGray: '#bbbbbb',
  fourPercentGray: 'rgba(0, 0, 0, 0.04)',
  sixtyPercentGray: 'rgba(0, 0, 0, 0.6)',
  twentyPercentGray: 'rgba(0, 0, 0, 0.2)',
  fortyPercentWhite: 'rgba(255,255,255,0.4)',
  fortyPercentBlack: 'rgba(0, 0, 0, 0.4)',
};

export const theme = createTheme({
  spacing: {
    xxs: 3,
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    xxl: 24,
  },
  borderRadii: {
    corner: 8,
    icon: 8,
    base: 4,
    tag: 3,
  },
  zIndices: {
    notice: 9,
  },

  colors: {
    transparent: 'transparent',
    success: palette.green,
    warn: palette.orange,
    fail: palette.red,
    link: palette.mediumBlue,
    white: palette.white,
    black: palette.black,
    /** 主色 */
    primaryColor: palette.blue,
    /** 渐变色（起） */
    secondaryColor: palette.lightBlue,
    /** 背景色-1 */
    backgroundColor1: palette.cyan,
    /** 警示性颜色-1 */
    dangerousColor: palette.red,
    /** 警示性颜色-2 */
    warningColor1: palette.orange,
    /** 警示性颜色-3 */
    warningColor2: palette.yellow,
    /** 背景色-2 */
    backgroundColor2: palette.lightRed,
    /** 背景色-3 */
    backgroundColor3: palette.lightOrange,
    /** 标题颜色 */
    primaryTextColor: palette.dark,
    /** 正文颜色 */
    secondaryTextColor: palette.lightDark,
    /** 提示性颜色-1 */
    primaryTipColor: palette.gray,
    /** 提示性颜色-2 */
    secondaryTipColor: palette.mediumGray,
    /** 提示性颜色-2-反转 */
    secondaryTipReverseColor: palette.pink,
    /** 蒙层颜色 */
    overlayColor: palette.twentyPercentBlack,
    /** 分割线、置灰 */
    borderColor: palette.darkGray,
    disabledColor: palette.mediumGray,
    disabledBgColor: palette.grayishGray,
    closedBgColor: palette.darkGray,
    closedTagColor: palette.twentyPercentGray,
    tagBgColor: palette.fourPercentGray,
    tagTextColor: palette.sixtyPercentGray,
    backgroundColor4: palette.white,
    backgroundColor5: palette.lightGray,
    /** 按钮 ripple 样式遮罩颜色 */
    rippleColor: palette.fortyPercentWhite,
    /** 按钮 default 模式遮罩颜色 */
    btnCoverColor: palette.twentyPercentGray,
    emptyBgColor: palette.white,
    /** Toast 背景色 */
    normalBackground: palette.lightPink,
    exceptionBackground: palette.lightRed,
    maskBackground: palette.fortyPercentBlack,
    /** Keyboard 按钮颜色 */
    keyboardIconColor: palette.mediumGray,
    underlayColor: palette.lightGray,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024,
  },
  textVariants: {
    /** 主标题-1  */
    primaryTitle: {
      fontSize: 18,
      color: 'primaryTextColor',
    },
    /** 主标题-2 */
    primaryTitleReverse: {
      fontSize: 18,
      color: 'white',
    },
    /** 内容性文字-1 */
    primaryBody: {
      fontSize: 16,
      color: 'primaryTextColor',
    },
    /** 内容性文字-2 */
    primaryBodyReverse: {
      fontSize: 16,
      color: 'white',
    },
    /** 内容性文字-3 */
    secondaryBody: {
      fontSize: 14,
      color: 'primaryTextColor',
    },
    /** 内容性文字-4 */
    secondaryBodyReverse: {
      fontSize: 14,
      color: 'secondaryTextColor',
    },
    /** 内容性文字-5 */
    thirdBody: {
      fontSize: 12,
      color: 'secondaryTextColor',
    },
    /** 提示性文字-1 */
    primaryTip: {
      fontSize: 16,
      color: 'secondaryTipColor',
    },
    /** 提示性文字-2 */
    primaryTipReverse: {
      fontSize: 16,
      color: 'primaryColor',
    },
    /** 提示性文字-3 */
    secondaryTip: {
      fontSize: 14,
      color: 'primaryColor',
    },
    /** 提示性文字-4 */
    secondaryTipReverse: {
      fontSize: 14,
      color: 'secondaryTipReverseColor',
    },
    /** 提示性文字-5 */
    thirdTip: {
      fontSize: 14,
      color: 'warningColor1',
    },
    /** 警示性文字 */
    warn: {
      fontSize: 16,
      color: 'dangerousColor',
    },
    /** 辅助性文字-1 */
    primaryHelp: {
      fontSize: 12,
      color: 'primaryTipColor',
    },
    /** 辅助性文字-2 */
    secondaryHelp: {
      fontSize: 10,
      color: 'primaryTipColor',
    },
    /** 辅助性文字-3 */
    secondaryHelpReverse: {
      fontSize: 10,
      color: 'white',
    },
    /** 辅助性文字-4 */
    thirdHelp: {
      fontSize: 10,
      color: 'primaryColor',
    },
    /** 日期-1 */
    primaryDate: {
      fontSize: 18,
      color: 'primaryTextColor',
    },
    /** 日期-2 */
    secondaryDate: {
      fontSize: 14,
      color: 'secondaryTipColor',
    },
    /** 数字-1 */
    primaryNumber: {
      fontSize: 14,
      color: 'primaryColor',
    },
    /** 数字-2 */
    secondaryNumber: {
      fontSize: 8,
      color: 'white',
    },
    failTip: {
      fontSize: 10,
      color: 'fail',
    },
  },
  tagVariants: {
    /** 大标签 */
    large: {
      paddingHorizontal: 'xxl',
      overflow: 'visible',
      justifyContent: 'center',
      alignItems: 'center',
      height: 32,
    },
    /** 中标签, 默认标签 */
    middle: {
      paddingHorizontal: 'l',
      overflow: 'visible',
      justifyContent: 'center',
      alignItems: 'center',
      height: 26,
    },
    /** 小标签 */
    small: {
      paddingHorizontal: 'm',
      overflow: 'visible',
      justifyContent: 'center',
      alignItems: 'center',
      height: 20,
    },
  },
});
