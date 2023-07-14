import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text } from '@td-design/react-native';

import { formatDate } from '@/utils/date';

import LongList from './LongList';

export const TabListDemo = () => {
  const date = new Date();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const [orderDate, setOrderDate] = useState(date);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setOrderDate(new Date())}>
          <Text>{formatDate(orderDate)}</Text>
        </TouchableOpacity>
      ),
    });
  }, [orderDate]);

  const FirstRoute = () => <LongList orderDate={orderDate} />;
  const SecondRoute = () => <LongList orderDate={orderDate} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  // const renderScene = ({ route }) => {
  //   switch (route.key) {
  //     case 'first':
  //       return <FirstRoute />;

  //     case 'second':
  //       return <SecondRoute />;

  //     default:
  //       return null;
  //   }
  // };

  const routes = [
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ];

  const [index, setIndex] = useState(0);

  return <TabView lazy navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} />;
};
