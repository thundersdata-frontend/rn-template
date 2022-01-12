import { FC, memo } from 'react';
import { Text, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Container, RecyclerFlatList } from 'components';
import { Box, Center, PullToRefresh } from '@td-design/react-native';
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

export function RecyclerListDemo1() {
  const { refreshing, loadingMore, allLoaded, onRefresh, onLoadMore, data } = useRefreshService<DataType>(fetchData);

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

  const renderChildren = ({
    onScroll,
    onMomentumScrollEnd,
    scrollEnabled,
  }: {
    onScroll: () => void;
    onMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollEnabled: boolean;
  }) => {
    return (
      <RecyclerFlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        itemHeight={140}
        renderFooter={renderFooter}
        onScroll={onScroll}
        scrollViewProps={{
          bounces: false,
          scrollEnabled,
          scrollEventThrottle: 16,
          onMomentumScrollEnd,
        }}
        onEndReached={onLoadMore}
        onEndReachedThreshold={20}
      />
    );
  };

  return (
    <Container>
      <PullToRefresh onRefresh={onRefresh} refreshing={refreshing} renderChildren={renderChildren} />
    </Container>
  );
}

const Cell: FC<{ item: DataType }> = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => console.log(item)}>
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
    </TouchableOpacity>
  );
};
const CellContainer = memo(Cell);
