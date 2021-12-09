import { FC, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, ViewProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useDimensions } from '@td-design/rn-hooks';

interface KeyboardShiftProps extends ViewProps {
  headerOffset?: number;
}

export const KeyboardShift: FC<KeyboardShiftProps> = ({ children, headerOffset, style, ...rest }) => {
  const shift = useSharedValue(0);
  const { window } = useDimensions();

  useEffect(() => {
    const sub = Keyboard.addListener('keyboardDidShow', e => {
      const { height: windowHeight } = window;
      const keyboardHeight = e.endCoordinates.height;

      const currentFocusedInputRef = TextInput.State.currentlyFocusedInput();
      currentFocusedInputRef.measure((_x, _y, _width, _height, _pageX, _pageY) => {
        const gap = windowHeight - keyboardHeight - (_pageY + _height);
        if (gap >= 0) return;
        shift.value = withTiming(gap);
      });
    });

    return () => sub.remove();
  }, [shift, window]);

  useEffect(() => {
    const sub = Keyboard.addListener('keyboardDidHide', () => {
      shift.value = withTiming(0);
    });

    return () => sub.remove();
  }, [shift]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: shift.value,
      },
    ],
  }));

  if (Platform.OS === 'android') {
    return (
      <Animated.View style={[style, animatedStyle]} {...rest}>
        {children}
      </Animated.View>
    );
  }

  const headerHeight = headerOffset ? headerOffset : 0;
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} style={style} behavior="padding" {...rest}>
      {children}
    </KeyboardAvoidingView>
  );
};
