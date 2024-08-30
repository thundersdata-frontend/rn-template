import { StyleSheet } from 'react-native';

import { Box, Button, Text } from '@td-design/react-native';
import { Image } from 'expo-image';

import { Container } from '@/components/Container';
import { LargeList } from '@/components/LargeList';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface DataType {
  id: number;
  type: 'text' | 'image';
  name?: string;
  url?: string;
  height?: number;
}

function fetchData({
  page = 1,
  pageSize = 10,
}: {
  page: number;
  pageSize: number;
}): Promise<AjaxResponse<Page<DataType>>> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 200,
        success: true,
        message: '获取数据成功',
        data: {
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
        },
      });
    }, 2000);
  });
}

export function FlashListDemo2() {
  const { data, loading, noMoreData, loadMore, loadingMore, refresh } = useInfiniteScroll<DataType>(fetchData);

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
        <Image source={{ uri: item.url }} style={StyleSheet.absoluteFill} contentFit="cover" />
      </Box>
    );
  };

  return (
    <Container>
      <Button title="开始加载" onPress={refresh} />
      <LargeList
        getItemType={item => item.type}
        keyExtractor={'id'}
        estimatedItemSize={40}
        {...{ renderItem, data, refresh, loadMore, loading, loadingMore, noMoreData }}
      />
    </Container>
  );
}
