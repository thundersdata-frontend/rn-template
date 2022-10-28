/* eslint-disable react-native/no-color-literals */
import { Box } from '@td-design/react-native';
import { Container, CustomRefreshControl, RecyclerFlatList } from 'components';
import { RenderItemInfo } from 'components/RecyclerFlatList';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { dogData } from './dogData';

function mockFetch(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

const data = dogData.map(item => ({
  imageUrl: item,
}));

export function RecyclerListDemo2() {
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

  const renderItem = ({ item }: RenderItemInfo<{ imageUrl: string }>) => {
    return (
      <Box flex={1} overflow={'hidden'} margin="x1">
        {/* 在列表中展示图片，请直接使用FastImage，不要用RN的Image和组件库的Image */}
        <FastImage source={{ uri: item.imageUrl }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      </Box>
    );
  };

  const renderFooter = () => {
    return (
      <View style={[styles.cell, { height: 200 }]}>
        <Text style={styles.title}>底部组件</Text>
      </View>
    );
  };

  return (
    <Container>
      <RecyclerFlatList
        marginHorizontal={10}
        gap={5}
        numColumns={2}
        keyExtractor={item => item.imageUrl}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
        renderItem={renderItem}
        headerHeight={21}
        itemHeight={200}
        data={data}
        scrollViewProps={{
          refreshControl: <CustomRefreshControl onRefresh={mockFetch} />,
        }}
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
