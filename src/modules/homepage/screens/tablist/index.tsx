import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text } from '@td-design/react-native';
import Tabs from '@td-design/react-native-tabs';
import { useSafeState } from '@td-design/rn-hooks';

import { Container } from '@/components/Container';
import { formatDate } from '@/utils/date';

import LongList from './LongList';

export const TabListDemo = () => {
  const date = new Date();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const [orderDate, setOrderDate] = useSafeState(date);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setOrderDate(new Date())}>
          <Text>{formatDate(orderDate)}</Text>
        </TouchableOpacity>
      ),
    });
  }, [orderDate]);

  const routes = [
    { key: 'first', title: 'First', component: <LongList orderDate={orderDate} /> },
    { key: 'second', title: 'Second', component: <LongList orderDate={orderDate} /> },
    { key: 'third', title: 'Third', component: <LongList orderDate={orderDate} /> },
  ];

  return (
    <Container>
      <Tabs scenes={routes} initialPage={1} />
    </Container>
  );
};
