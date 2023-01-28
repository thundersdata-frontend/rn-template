import { useState } from 'react';
import { Dimensions, KeyboardAvoidingViewProps, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CommonKeyboardAwareView } from './CommonKeyboardAwareView';

const { height: DEVICE_HEIGHT } = Dimensions.get('screen');

const IOSKeyboardAwareView = (props: KeyboardAvoidingViewProps) => {
  const insets = useSafeAreaInsets();
  const [screenHeight, setScreenHeight] = useState(0);

  const modalOffsetFromTop = DEVICE_HEIGHT - screenHeight;

  return (
    <View
      style={{ flex: 1 }}
      onLayout={event => {
        setScreenHeight(event.nativeEvent.layout.height);
      }}
    >
      {screenHeight ? (
        <CommonKeyboardAwareView {...props} keyboardVerticalOffset={modalOffsetFromTop - insets.bottom} />
      ) : null}
    </View>
  );
};

export const KeyboardAwareView = Platform.OS === 'ios' ? IOSKeyboardAwareView : CommonKeyboardAwareView;
