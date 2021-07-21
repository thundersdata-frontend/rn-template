import { theme, helpers } from '@td-design/react-native';

const { px } = helpers;
export const lightTheme = {
  ...theme.lightTheme,
  colors: {
    ...theme.lightTheme.colors,
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
