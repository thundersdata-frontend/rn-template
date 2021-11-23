import { FC } from 'react';
import { Keyboard, Platform, ScrollView, ScrollViewProps } from 'react-native';

export const KeyboardAwareScrollView: FC<ScrollViewProps> = ({ children, ...props }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      // 修复安卓手机上keyboardDismissMode="on-drag"不起作用的问题
      // https://github.com/facebook/react-native/issues/23364
      onScrollBeginDrag={Platform.OS === 'android' ? Keyboard.dismiss : () => {}}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </ScrollView>
  );
};
