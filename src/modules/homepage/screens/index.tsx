import { Alert, Platform, ScrollView } from 'react-native';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';

import NiceModal from '@ebay/nice-modal-react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, WhiteSpace, WingBlank } from '@td-design/react-native';

import { Clipboard } from '@/components/Clipboard';
import { Container } from '@/components/Container';
import TestModal from '@/modals/TestModal';

export function Homepage() {
  const navigation = useNavigation<NavigationProp<AppParamList>>();

  return (
    <Container hasHeader={false}>
      <ScrollView>
        <WingBlank>
          <Button title="局部共享数据示例" onPress={() => navigation.navigate('LocalModelDemo')} />
          <WhiteSpace />
          <Button title="FlashList示例" onPress={() => navigation.navigate('FlashListDemo')} />
          <WhiteSpace />
          <Button title="瀑布流示例" onPress={() => navigation.navigate('WaterfallListDemo')} />
          <WhiteSpace />
          <Button title="通讯录示例" onPress={() => navigation.navigate('ContactsDemo')} />
          <WhiteSpace />
          <Button
            title="测试组件库Modal"
            onPress={() => NiceModal.show(TestModal, { content: '我是内容', position: 'center' })}
          />
          <WhiteSpace />
          <Button title="测试导航库Modal" onPress={() => navigation.navigate('NavigationModal')} />
          <WhiteSpace />
          <Button
            title="热更新测试"
            onPress={() =>
              codePush
                .sync({
                  deploymentKey: Platform.OS === 'android' ? Config.CODEPUSH_KEY_ANDROID : Config.CODEPUSH_KEY_IOS,
                })
                .then(res => console.log(res))
                .catch(e => console.error(e))
            }
          />
          <WhiteSpace />
          <Button title="长表单示例" onPress={() => navigation.navigate('LongFormDemo')} />
          <WhiteSpace />
          <Button title="本地图片示例" onPress={() => navigation.navigate('LocalImageDemo')} />
          <WhiteSpace />
          <Button title="网络图片示例" onPress={() => navigation.navigate('OnlineImageDemo')} />
          <WhiteSpace />
          <Button title="复制功能" onPress={() => Clipboard.setString((Math.random() * 100).toFixed(2))} />
          <WhiteSpace />
          <Button
            title="粘贴功能"
            onPress={async () => {
              const data = await Clipboard.getString();
              Alert.alert(data);
            }}
          />
          <WhiteSpace />
          <Button title="文字Variant示例" onPress={() => navigation.navigate('TextDemo')} />
          <WhiteSpace />
          <Button title="Tabs下长列表示例" onPress={() => navigation.navigate('TabListDemo')} />
          <WhiteSpace />
        </WingBlank>
      </ScrollView>
    </Container>
  );
}
