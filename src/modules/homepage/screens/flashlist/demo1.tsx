import { Box, Text } from '@td-design/react-native';
import { Container, LargeList } from 'components';
import { useRefreshService } from 'hooks/useRefreshService';

interface DataType {
  id: number;
  name: string;
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
          .map((_, index) => ({ id: (page - 1) * pageSize + index, name: `Cell${(page - 1) * pageSize + index}` })),
      });
    }, 2000);
  });
}

export function FlashListDemo1() {
  const { loadingMore, allLoaded, onLoadMore, data, onRefresh, refreshing } = useRefreshService<DataType>(fetchData);

  const renderItem = ({ item }: { item: DataType }) => (
    <Box height={200} alignItems="center" justifyContent={'center'} borderTopWidth={1} borderColor="black">
      <Text>{item.name}</Text>
    </Box>
  );

  return (
    <Container>
      <LargeList
        data={data}
        keyExtractor={item => item.id + ''}
        estimatedItemSize={200}
        onEndReached={onLoadMore}
        onEndReachedThreshold={100}
        {...{ renderItem, onRefresh, refreshing, loadingMore, allLoaded }}
      />
    </Container>
  );
}
