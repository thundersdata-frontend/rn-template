import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Center } from '@td-design/react-native';
import { Container } from 'components';

export function Homepage() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <Container>
      <Center>
        <Button title="通讯录示例" onPress={() => navigation.navigate('IndexBarDemo')} />
        <Button title="局部共享数据示例" onPress={() => navigation.navigate('LocalModelDemo')} />
        <Button title="RecyclerListView示例" onPress={() => navigation.navigate('RecyclerListDemo')} />
      </Center>
    </Container>
  );
}
