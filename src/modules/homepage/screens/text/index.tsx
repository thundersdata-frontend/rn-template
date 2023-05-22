import { ScrollView } from 'react-native';

import { Divider, Text, WhiteSpace } from '@td-design/react-native';

import { Container } from '@/components/Container';

export function TextDemo() {
  return (
    <Container>
      <ScrollView>
        <Text>Variant示例</Text>
        <Divider axis="horizontal" />
        <Text variant="h0">你好，我是文字</Text>
        <Text variant="h1">你好，我是文字</Text>
        <Text variant="h2">你好，我是文字</Text>
        <Text variant="h3">你好，我是文字</Text>
        <Text variant="h4">你好，我是文字</Text>
        <Text variant="p0">你好，我是文字</Text>
        <Text variant="p1">你好，我是文字</Text>
        <Text variant="p2">你好，我是文字</Text>
        <Text variant="p3">你好，我是文字</Text>
        <Text variant="p4">你好，我是文字</Text>
        <Text variant="d0">123456789</Text>
        <Text variant="d1">123456789</Text>
        <Text variant="d2">123456789</Text>
        <Text variant="d3">123456789</Text>
        <WhiteSpace />
        <Text>FontWeight示例</Text>
        <Divider axis="horizontal" />
        <Text variant="p1" fontWeight={'100'}>
          你好，我是文字 - 100
        </Text>
        <Text variant="p1" fontWeight={'200'}>
          你好，我是文字 - 200
        </Text>
        <Text variant="p1" fontWeight={'300'}>
          你好，我是文字 - 300
        </Text>
        <Text variant="p1" fontWeight={'400'}>
          你好，我是文字 - 400
        </Text>
        <Text variant="p1" fontWeight={'500'}>
          你好，我是文字 - 500
        </Text>
        <Text variant="p1" fontWeight={'600'}>
          你好，我是文字 - 600
        </Text>
        <Text variant="p1" fontWeight={'700'}>
          你好，我是文字 - 700
        </Text>
        <Text variant="p1" fontWeight={'800'}>
          你好，我是文字 - 800
        </Text>
        <Text variant="p1" fontWeight={'900'}>
          你好，我是文字 - 900
        </Text>
        <Text variant="p1" fontWeight={'normal'}>
          你好，我是文字 - normal
        </Text>
        <Text variant="p1" fontWeight={'bold'}>
          你好，我是文字 - bold
        </Text>
      </ScrollView>
    </Container>
  );
}
