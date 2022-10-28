import NiceModal from '@ebay/nice-modal-react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Center } from '@td-design/react-native';
import { Container } from 'components';
import TestModal from 'modals/TestModal';

export function Homepage() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <Container>
      <Center>
        <Button title="局部共享数据示例" onPress={() => navigation.navigate('LocalModelDemo')} />
        <Button title="RecyclerListView示例" onPress={() => navigation.navigate('RecyclerListDemo')} />
        <Button
          title="弹窗测试"
          onPress={() => NiceModal.show(TestModal, { content: '我是内容', position: 'center' })}
        />
      </Center>
    </Container>
  );
}
