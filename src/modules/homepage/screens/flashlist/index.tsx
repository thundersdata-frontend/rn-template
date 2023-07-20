import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Center } from '@td-design/react-native';

import { Container } from '@/components/Container';

export function FlashListDemo() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <Container>
      <Center>
        <Button title="Demo1" onPress={() => navigation.navigate('FlashListDemo1')} />
        <Button title="Demo2" onPress={() => navigation.navigate('FlashListDemo2')} />
      </Center>
    </Container>
  );
}
