import { FC } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  ScrollView,
  ScrollViewProps,
} from 'react-native';

interface KeyboardAwareScrollViewProps extends KeyboardAvoidingViewProps {
  /** ScrollView 相关属性 */
  scrollViewProps?: ScrollViewProps;
}

export const KeyboardAwareScrollView: FC<KeyboardAwareScrollViewProps> = ({ scrollViewProps, children, ...props }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" {...props}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        // 修复安卓手机上keyboardDismissMode="on-drag"不起作用的问题
        // https://github.com/facebook/react-native/issues/23364
        onScrollBeginDrag={Platform.OS === 'android' ? Keyboard.dismiss : () => {}}
        keyboardShouldPersistTaps="handled"
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
