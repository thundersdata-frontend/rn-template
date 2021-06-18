/* eslint-disable react-native/no-color-literals */
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Button, WhiteSpace, Input, SearchBar, NoticeBar, Accordion, DatePicker } from '@td-design/react-native';
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
      <Input />
      <SearchBar />
      <NoticeBar text="我是通知我是通知我是通知我是通知我是通知我是通知22222" />
      <WhiteSpace />
      <DatePicker displayType="view" />
      <WhiteSpace />
      <Accordion
        activeSections={[2]}
        sections={[
          { title: '我是标题', content: '11111111111111111' },
          {
            title: '我是标题',
            content: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
          },
          {
            title: '我是标题',
            content: `我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是`,
          },
        ]}
      />
    </Container>
  );
}
