import { Box, Center } from '@td-design/react-native';
import { Container, CustomRefreshControl, RecyclerFlatList } from 'components';
import { useRefreshService } from 'hooks/useRefreshService';
import { FC, memo } from 'react';
import { Text } from 'react-native';

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

export function RecyclerListDemo1() {
  const { loadingMore, allLoaded, onLoadMore, data, onRefresh } = useRefreshService<DataType>(fetchData);

  const renderItem = ({ item }: { item: DataType }) => {
    return <CellContainer item={item} />;
  };

  const renderFooter = () => {
    if (loadingMore)
      return (
        <Center height={80}>
          <Text>正在加载更多数据</Text>
        </Center>
      );
    if (allLoaded)
      return (
        <Center height={80}>
          <Text>没有更多数据</Text>
        </Center>
      );
    return null;
  };

  return (
    <Container>
      <RecyclerFlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        itemHeight={140}
        renderFooter={renderFooter}
        onEndReached={onLoadMore}
        onEndReachedThreshold={20}
        scrollViewProps={{
          refreshControl: <CustomRefreshControl onRefresh={onRefresh} />,
        }}
      />
    </Container>
  );
}

const Cell: FC<{ item: DataType }> = ({ item }) => {
  return (
    <Box
      backgroundColor="primary200"
      height={140}
      justifyContent="center"
      alignItems="center"
      borderBottomWidth={1}
      borderBottomColor="border"
    >
      <Text>{item.name}</Text>
    </Box>
  );
};
const CellContainer = memo(Cell);
