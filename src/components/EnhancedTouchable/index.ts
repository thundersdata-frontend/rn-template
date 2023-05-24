import { TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { Pressable } from '@td-design/react-native';

import withPressEvents from '@/hoc/withPressEvents';

export const EnhancedTouchableOpacity = withPressEvents(TouchableOpacity);
export const EnhancedTouchableHighlight = withPressEvents(TouchableHighlight);
export const EnhancedTouchableWithoutFeedback = withPressEvents(TouchableWithoutFeedback);
export const EnhancedTouchableNativeFeedback = withPressEvents(TouchableNativeFeedback);
export const EnhancedPressable = withPressEvents(Pressable);
