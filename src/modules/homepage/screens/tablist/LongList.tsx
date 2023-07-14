import { memo } from 'react';

import { Box, Text } from '@td-design/react-native';

import { LargeList } from '@/components/LargeList';
import { useRefreshService } from '@/hooks/useRefreshService';

interface DataType {
  id: number;
  name: string;
}

function fetchData({ page = 1, pageSize = 10 }: { page: number; pageSize: number }): Promise<Page<DataType>> {
  console.log('aaaa');
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

function LongList({ orderDate }: { orderDate: Date }) {
  const { loadingMore, allLoaded, onLoadMore, data, onRefresh, refreshing } = useRefreshService<DataType>(fetchData, {
    refreshDeps: [orderDate],
  });

  const renderItem = ({ item }: { item: DataType }) => (
    <Box height={200} alignItems="center" justifyContent={'center'} borderBottomWidth={1} borderColor="black">
      <Text>{item.name}</Text>
    </Box>
  );

  return (
    <LargeList
      data={data}
      keyExtractor={item => item.id + ''}
      estimatedItemSize={200}
      onEndReached={onLoadMore}
      {...{ renderItem, onRefresh, refreshing, loadingMore, allLoaded }}
    />
  );
}

export default memo(LongList);
