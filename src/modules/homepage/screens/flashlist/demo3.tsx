import { Box, Text } from '@td-design/react-native';

import { Container } from '@/components/Container';
import { RefreshFlatList } from '@/components/RefreshFlatList';
import { useRefreshService } from '@/hooks/useRefreshService';

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

export const RefreshFlatListDemo = () => {
  const { data, loadingMore, refreshing, allLoaded, onRefresh, onLoadMore } = useRefreshService<DataType>(fetchData);

  const renderItem = ({ item }: { item: DataType }) => (
    <Box height={200} alignItems="center" justifyContent={'center'} borderTopWidth={1} borderColor="black">
      <Text>{item.name}</Text>
    </Box>
  );

  return (
    <Container>
      <RefreshFlatList
        {...{ data, loadingMore, refreshing, allLoaded, onRefresh, renderItem }}
        onEndReached={onLoadMore}
      />
    </Container>
  );
};
