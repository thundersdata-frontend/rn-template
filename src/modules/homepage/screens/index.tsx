import { Input } from '@td-design/react-native';
import { Container, KeyboardAwareScrollView } from 'components';
import { KeyboardShift } from 'components/KeyboardShift';
import { Keyboard, Platform, Text, View } from 'react-native';

export function Homepage() {
  return (
    <Container hasHeader={false}>
      <KeyboardShift style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          // 修复安卓手机上keyboardDismissMode="on-drag"不起作用的问题
          // https://github.com/facebook/react-native/issues/23364
          onScrollBeginDrag={Platform.OS === 'android' ? Keyboard.dismiss : () => {}}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ height: 500 }}>
            <Text>123</Text>
          </View>
          <Input />
        </KeyboardAwareScrollView>
      </KeyboardShift>
    </Container>
  );
}
