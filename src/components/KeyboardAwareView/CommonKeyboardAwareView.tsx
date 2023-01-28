import { useHeaderHeight } from '@react-navigation/elements';
import {
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps as RNKeyboardAvoidingViewProps,
} from 'react-native';

const BEHAVIOR = Platform.OS === 'ios' ? 'padding' : undefined;

export const CommonKeyboardAwareView = ({ style, ...props }: RNKeyboardAvoidingViewProps) => {
  const headerHeight = useHeaderHeight();

  return (
    <RNKeyboardAvoidingView
      style={[{ flex: 1 }, style]}
      behavior={BEHAVIOR}
      keyboardVerticalOffset={headerHeight}
      {...props}
    />
  );
};
