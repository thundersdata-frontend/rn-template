import { RouteProp, useRoute } from '@react-navigation/native';
import { Center, Text } from '@td-design/react-native';

import { Container } from '@/components/Container';

export function DetailDemo() {
  const route = useRoute<RouteProp<AppParamList, 'DetailDemo'>>();
  return (
    <Container>
      <Center>
        <Text>接收到的id是：{route.params.id}</Text>
      </Center>
    </Container>
  );
}
