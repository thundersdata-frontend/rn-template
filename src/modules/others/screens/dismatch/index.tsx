import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Center, Text } from '@td-design/react-native';

import { Container } from '@/components/Container';

export function NotFound() {
  const navigation = useNavigation<NavigationProp<AppParamList>>();

  return (
    <Container hasHeader={false}>
      <Center>
        <Text>路由地址匹配失败</Text>
        <Button title="返回首页" onPress={() => navigation.navigate('Homepage')} />
      </Center>
    </Container>
  );
}
