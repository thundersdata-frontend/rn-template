import { memo } from 'react';

import { Box, Text } from '@td-design/react-native';

import { LargeList } from '@/components/LargeList';
import { useRefreshService } from '@/hooks/useRefreshService';

interface DataType {
  id: number;
  name: string;
}

function fetchData({ page = 1, pageSize = 10, orderDate }: PageParams & Obj): Promise<Page<DataType>> {
  console.log('aaaa', orderDate);
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

/**
 * 当在Tabs下使用时，需要保证每个Tab下的组件的queryKey是唯一的，否则会出现切换Tab时数据错乱的问题
 */
function LongList({ orderDate, uniqKey }: { orderDate: Date; uniqKey: string }) {
  const { data, loading, noMoreData, loadMore, loadingMore, refresh } = useRefreshService<DataType>(fetchData, {
    queryKey: [`LongList-${uniqKey}`, { orderDate }],
  });

  const renderItem = ({ item }: { item: DataType }) => (
    <Box height={200} alignItems="center" justifyContent={'center'} borderBottomWidth={1} borderColor="black">
      <Text>{item.name}</Text>
    </Box>
  );

  return (
    <LargeList
      keyExtractor={'id'}
      estimatedItemSize={200}
      {...{ renderItem, data, loadMore, refresh, loading, loadingMore, noMoreData }}
    />
  );
}

export default memo(LongList);
