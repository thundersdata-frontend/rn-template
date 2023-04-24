import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Center, Text } from '@td-design/react-native';

import { Container } from '@/components/Container';

export function NavigationModal() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <Container>
      <Center>
        <Text>你好，我是React Navigation实现的弹窗</Text>
        <Button title="关闭" onPress={() => navigation.goBack()} />
      </Center>
    </Container>
  );
}
