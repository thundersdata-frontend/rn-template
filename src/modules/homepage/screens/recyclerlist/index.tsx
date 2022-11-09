import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, WhiteSpace } from '@td-design/react-native';
import { Container } from 'components';

export function RecyclerListDemo() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  return (
    <Container>
      <Button onPress={() => navigation.navigate('RecyclerListDemo1')} title="Demo1" />
      <WhiteSpace />
      <Button onPress={() => navigation.navigate('RecyclerListDemo2')} title="Demo2" />
      <WhiteSpace />
      <Button onPress={() => navigation.navigate('RecyclerListDemo3')} title="Demo3" />
      <WhiteSpace />
      <Button onPress={() => navigation.navigate('RecyclerListDemo4')} title="Demo4" />
    </Container>
  );
}
