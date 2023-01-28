import NiceModal from '@ebay/nice-modal-react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Center, WhiteSpace } from '@td-design/react-native';
import { Container } from 'components';
import TestModal from 'modals/TestModal';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';

export function Homepage() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <Container>
      <Center>
        <Button title="局部共享数据示例" onPress={() => navigation.navigate('LocalModelDemo')} />
        <WhiteSpace />
        <Button title="FlashList示例" onPress={() => navigation.navigate('FlashListDemo')} />
        <WhiteSpace />
        <Button title="瀑布流示例" onPress={() => navigation.navigate('WaterfallListDemo')} />
        <WhiteSpace />
        <Button title="通讯录示例" onPress={() => navigation.navigate('ContactsDemo')} />
        <WhiteSpace />
        <Button
          title="弹窗测试"
          onPress={() => NiceModal.show(TestModal, { content: '我是内容', position: 'center' })}
        />
        <WhiteSpace />
        <Button
          title="热更新测试"
          onPress={() =>
            codePush
              .sync({
                deploymentKey: Config.CODEPUSH_KEY_IOS,
              })
              .then(res => console.log(res))
              .catch(e => console.error(e))
          }
        />
        <WhiteSpace />
        <Button title="长表单示例" onPress={() => navigation.navigate('LongFormDemo')} />
        <WhiteSpace />
      </Center>
    </Container>
  );
}
