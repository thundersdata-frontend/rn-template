import { helpers, theme } from '@td-design/react-native';

const { px } = helpers;
/** 覆盖默认的variants */
const extraVariants = {
  h0: {
    fontSize: px(24),
    lineHeight: px(34),
    fontFamily: 'PingFang SC',
    fontWeight: 'bold',
  },
  h1: {
    fontSize: px(18),
    lineHeight: px(25),
    fontFamily: 'PingFang SC',
    fontWeight: 'bold',
  },
  h2: {
    fontSize: px(16),
    lineHeight: px(22),
    fontFamily: 'PingFang SC',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: px(14),
    lineHeight: px(20),
    fontFamily: 'PingFang SC',
    fontWeight: 'bold',
  },
  h4: {
    fontSize: px(12),
    lineHeight: px(16),
    fontFamily: 'PingFang SC',
    fontWeight: 'bold',
  },
  p0: {
    fontSize: px(16),
    lineHeight: px(22),
    fontFamily: 'PingFang SC',
    fontWeight: 'normal',
  },
  p1: {
    fontSize: px(14),
    lineHeight: px(20),
    fontFamily: 'PingFang SC',
    fontWeight: 'normal',
  },
  p2: {
    fontSize: px(12),
    lineHeight: px(16),
    fontFamily: 'PingFang SC',
    fontWeight: 'normal',
  },
  p3: {
    fontSize: px(10),
    lineHeight: px(14),
    fontFamily: 'PingFang SC',
    fontWeight: 'normal',
  },
  p4: {
    fontSize: px(8),
    lineHeight: px(11),
    fontFamily: 'PingFang SC',
    fontWeight: 'normal',
  },
  d0: {
    fontSize: px(38),
    lineHeight: px(45),
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  d1: {
    fontSize: px(18),
    lineHeight: px(21),
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  d2: {
    fontSize: px(12),
    lineHeight: px(14),
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  d3: {
    fontSize: px(24),
    lineHeight: px(28),
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
};

export const lightTheme = {
  ...theme.lightTheme,
  colors: {
    ...theme.lightTheme.colors,
    iconBg: 'rgba(255,255,255,0.3)',
    tabActive: '#C6E1FD',
  },
  textVariants: {
    ...theme.lightTheme.textVariants,
    ...extraVariants,
  },
};

export type AppTheme = typeof lightTheme;

export const darkTheme: AppTheme = {
  ...theme.darkTheme,
  colors: {
    ...theme.darkTheme.colors,
    iconBg: 'rgba(255,255,255,0.3)',
    tabActive: '#C6E1FD',
  },
  textVariants: {
    ...theme.darkTheme.textVariants,
    ...extraVariants,
  },
};
