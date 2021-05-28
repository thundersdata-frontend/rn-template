import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@td-design/react-native';
import Config from 'react-native-config';

import { Container } from 'components/Container';
import { EchartsDemo } from './EchartsDemo';
import { Text } from 'components/Text';

export function Mine({ navigation }: { navigation: StackNavigationProp<MainStackParamList, 'Mine'> }) {
  return (
    <Container hasHeader={false}>
      <EchartsDemo />
      <Button onPress={() => navigation.navigate('Address')} title="去地址信息页面" />
      <Text>后端接口地址：{Config.API_URL}</Text>
    </Container>
  );
}
