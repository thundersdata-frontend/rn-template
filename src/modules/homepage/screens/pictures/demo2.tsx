import { Divider, Image, Text, WhiteSpace, WingBlank } from '@td-design/react-native';
import { Container } from 'components';
import { ScrollView } from 'react-native';

export function OnlineImageDemo() {
  return (
    <Container>
      <ScrollView>
        <WingBlank>
          <WhiteSpace />
          <Text>png格式</Text>
          <Image
            source={{ uri: 'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1674894080291008982.png' }}
            style={{ width: 200, height: 200 }}
          />
          <WhiteSpace />
          <Divider />
          <WhiteSpace />
          <Text>jpg格式</Text>
          <Image
            source={{ uri: 'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1674894080268285814.jpg' }}
            style={{ width: 200, height: 200 }}
          />
          <WhiteSpace />
          <Divider />
          <WhiteSpace />
          <Text>webp格式</Text>
          <Image
            source={{ uri: 'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1674894080261498615.webp' }}
            style={{ width: 200, height: 200 }}
          />
          <WhiteSpace />
          <Divider />
          <WhiteSpace />
          <Text>gif格式</Text>
          <Image
            source={{ uri: 'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1674894080266681075.gif' }}
            style={{ width: 200, height: 200 }}
          />
          <WhiteSpace />
          <Divider />
          <WhiteSpace />
          <Text>animated webp格式</Text>
          <Image
            source={{ uri: 'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1674894080297431191.webp' }}
            style={{ width: 200, height: 200 }}
          />
          <WhiteSpace />
          <Divider />
          <WhiteSpace />
        </WingBlank>
      </ScrollView>
    </Container>
  );
}
