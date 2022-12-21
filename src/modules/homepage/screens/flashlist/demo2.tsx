import { Box, Center, Text } from '@td-design/react-native';
import { Container, LargeList } from 'components';
import { useRefreshService } from 'hooks/useRefreshService';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

interface DataType {
  id: number;
  type: 'text' | 'image';
  name?: string;
  url?: string;
  height?: number;
}

function fetchData({ page = 1, pageSize = 10 }: { page: number; pageSize: number }): Promise<Page<DataType>> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        page,
        pageSize,
        total: 30,
        totalPage: 3,
        list: Array(10)
          .fill('')
          .map((_, index) => {
            if (Math.random() >= 0.5) {
              return {
                id: (page - 1) * pageSize + index,
                name: `Cell${(page - 1) * pageSize + index}`,
                type: 'text',
                url: '',
              };
            }
            return {
              id: (page - 1) * pageSize + index,
              height: +(Math.random() * 1000).toFixed(0),
              type: 'image',
              url: 'https://images.dog.ceo/breeds/husky/20180901_150234.jpg',
            };
          }),
      });
    }, 2000);
  });
}

export function FlashListDemo2() {
  const { loadingMore, allLoaded, onLoadMore, data, onRefresh, refreshing } = useRefreshService<DataType>(fetchData);

  const renderItem = ({ item }: { item: DataType }) => {
    if (item.type === 'text') {
      return (
        <Box height={40} alignItems="center" justifyContent={'center'}>
          <Text>{item.name}</Text>
        </Box>
      );
    }
    return (
      <Box height={item.height} overflow={'hidden'} margin="x1">
        {/* 在列表中展示图片，请直接使用FastImage，不要用RN的Image和组件库的Image */}
        <FastImage source={{ uri: item.url }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      </Box>
    );
  };

  const renderFooter = () => {
    if (loadingMore)
      return (
        <Center height={40}>
          <Text>正在加载更多数据</Text>
        </Center>
      );
    if (allLoaded)
      return (
        <Center height={40}>
          <Text>没有更多数据</Text>
        </Center>
      );
    return null;
  };

  return (
    <Container>
      <LargeList
        data={data}
        getItemType={item => item.type}
        keyExtractor={item => item.id + ''}
        estimatedItemSize={40}
        renderFooter={renderFooter}
        onEndReached={onLoadMore}
        onEndReachedThreshold={100}
        {...{ renderItem, onRefresh, refreshing, loadingMore, allLoaded }}
      />
    </Container>
  );
}
