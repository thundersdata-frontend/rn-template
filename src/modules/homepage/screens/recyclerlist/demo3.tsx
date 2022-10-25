/* eslint-disable react-native/no-color-literals */
import { Box } from '@td-design/react-native';
import { Container, CustomRefreshControl, RecyclerWaterfallList } from 'components';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { dogData } from './dogData';

interface DataType {
  imageUrl: string;
  name: string;
}

const ImageRenderer = memo(({ imageUrl }: { imageUrl: string }) => {
  return (
    <Box flex={1} overflow={'hidden'} margin="x1">
      {/* 在列表中展示图片，请直接使用FastImage，不要用RN的Image和组件库的Image */}
      <FastImage source={{ uri: imageUrl }} style={StyleSheet.absoluteFill} resizeMode="cover" />
    </Box>
  );
});

function mockFetch(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

export function RecyclerListDemo3() {
  const renderItem = ({ item }: { item: DataType }) => {
    return <ImageRenderer imageUrl={item.imageUrl} />;
  };

  const renderFooter = () => {
    return (
      <View style={[styles.cell, { height: 50 }]}>
        <Text style={styles.title}>底部组件</Text>
      </View>
    );
  };

  return (
    <Container>
      <RecyclerWaterfallList
        numColumns={2}
        renderItem={renderItem}
        renderFooter={renderFooter}
        keyExtractor={item => item.imageUrl}
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

const data = dogData.map((item, index) => ({
  imageUrl: item,
  height: Math.random() > 0.5 ? 150 : 250,
  name: `dog-${index}`,
}));
