import { ScrollView } from 'react-native';

import { Divider, Text, WhiteSpace, WingBlank } from '@td-design/react-native';
import { Image } from 'expo-image';

import { Container } from '@/components/Container';

export function OnlineImageDemo() {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <Container>
      <ScrollView>
        <WingBlank>
          <WhiteSpace />
          <Text>blurhash示例</Text>
          <Image
            style={{ width: 200, height: 200 }}
            source="https://picsum.photos/seed/696/3000/2000"
            placeholder={blurhash}
            contentFit="cover"
            transition={2000}
          />
          <WhiteSpace />
          <Divider />
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
