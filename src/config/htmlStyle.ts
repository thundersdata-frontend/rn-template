import { StyleSheet } from 'react-native';
import Colors from './colors';
import Size from './size';

const htmlStyle = StyleSheet.create({
  a: {
    color: Colors.primary,
    fontSize: Size.px(14),
    fontWeight: '500',
  },
  div: {
    lineHeight: Size.px(24),
    fontSize: Size.px(14),
    color: Colors.dark,
  },
});
export default htmlStyle;
