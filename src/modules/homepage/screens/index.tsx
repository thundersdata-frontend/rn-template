/* eslint-disable react-native/no-color-literals */
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Button, WhiteSpace, Input } from '@td-design/react-native';
import { Container } from 'components/Container';

export function Homepage() {
  const x = useSharedValue(0);

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: x.value,
      },
    ],
  }));

  const handleRotate = () => {
    x.value = withTiming(100);
  };

  return (
    <Container hasHeader={false}>
      <Animated.View style={[{ backgroundColor: '#0189fb', width: 50, height: 50 }, rotateStyle]} />
      <WhiteSpace />
      <Button title="rotate" onPress={handleRotate} />
      <WhiteSpace />
      {/** uncomment the next line will report error */}
      <Input />
      {/* <SearchBar /> */}
      {/* <NoticeBar text="我是通知我是通知我是通知我是通知我是通知我是通知22222" /> */}
    </Container>
  );
}
