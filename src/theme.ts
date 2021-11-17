import { theme, helpers } from '@td-design/react-native';

const { px } = helpers;
export const lightTheme = {
  ...theme.lightTheme,
  colors: {
    ...theme.lightTheme.colors,
    iconBg: 'rgba(255,255,255,0.3)',
    tabActive: '#C6E1FD',
  },
  textVariants: {
    ...theme.lightTheme.textVariants,
    h3: {
      fontSize: px(28),
      lineHeight: px(39.2),
      fontWeight: '500',
    },
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
    h3: {
      fontSize: px(28),
      lineHeight: px(39.2),
      fontWeight: '500',
    },
  },
};
