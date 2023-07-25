import { ScrollView } from 'react-native';

import { Divider, Text, WhiteSpace, WingBlank } from '@td-design/react-native';
import { Image } from 'expo-image';

import { Container } from '@/components/Container';

import animatedWebp from './assets/animated-webp.webp';
import animatedGif from './assets/animated.gif';
import d3Jpg from './assets/d3Jpg.jpg';
import d3Png from './assets/d3Png.png';
import d3Webp from './assets/d3Webp.webp';

export function LocalImageDemo() {
  return (
    <Container>
      <ScrollView>
        <WingBlank>
          <WhiteSpace />
          <Text>png格式</Text>
          <Image source={d3Png} style={{ width: 200, height: 200 }} />
          <WhiteSpace />
          <Divider />
          <WhiteSpace />
          <Text>jpg格式</Text>
          <Image source={d3Jpg} style={{ width: 200, height: 200 }} />
          <WhiteSpace />
          <Divider />
          <WhiteSpace />
          <Text>webp格式</Text>
          <Image source={d3Webp} style={{ width: 200, height: 200 }} />
          <WhiteSpace />
          <Divider />
          <WhiteSpace />
          <Text>gif格式</Text>
          <Image source={animatedGif} style={{ width: 200, height: 200 }} />
          <WhiteSpace />
          <Divider />
          <WhiteSpace />
          <Text>animated webp格式</Text>
          <Image source={animatedWebp} style={{ width: 200, height: 200 }} />
          <WhiteSpace />
          <Divider />
          <WhiteSpace />
        </WingBlank>
      </ScrollView>
    </Container>
  );
}
