/* eslint-disable react-native/no-color-literals */
import { View, Text, StyleSheet } from 'react-native';
import { useSafeState } from '@td-design/rn-hooks';
import { RenderItemInfo } from 'components/RecyclerFlatList';
import { Container, RecyclerFlatList } from 'components';
import { getRandomData } from 'utils/lorem';
import { Pressable } from '@td-design/react-native';

export function RecyclerListDemo2() {
  const [data, setData] = useSafeState([{ title: '我是1', backgroundColor: 'blue' }, ...getRandomData(30)]);

  const renderHeader = () => {
    return (
      <View
        style={{
          height: 21,
          backgroundColor: 'red',
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <Text style={styles.title}>HeaderComponent</Text>
      </View>
    );
  };

  const renderItem = ({ type, item, index }: RenderItemInfo<any>) => {
    console.log(item, index, type);
    return (
      <View
        style={{
          borderRadius: 8,
          overflow: 'hidden',
          backgroundColor: item.backgroundColor,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.title}>{index}</Text>
        <Text style={styles.title}>{item.height}</Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={[styles.cell, { height: 200 }]}>
        <Text style={styles.title}>底部组件</Text>
        <Pressable onPress={() => setData([...getRandomData(300)])}>
          <Text>加载更多</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Container>
      <RecyclerFlatList
        marginHorizontal={10}
        numColumns={2}
        gap={10}
        keyExtractor={item => item.title}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
        renderItem={renderItem}
        headerHeight={21}
        itemHeight={120}
        data={data}
        // initialOffset={1000}
        // initialRenderIndex={9}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#999',
  },
  title: {
    textAlign: 'center',
    color: '#FFF',
  },
});
