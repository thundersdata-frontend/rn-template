import { memo } from 'react';

import { Box, Text } from '@td-design/react-native';

import { LargeList } from '@/components/LargeList';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface DataType {
  id: number;
  name: string;
}

function fetchData({ page = 1, pageSize = 10, orderDate }: PageParams & Obj): Promise<AjaxResponse<Page<DataType>>> {
  console.log('aaaa', orderDate);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        code: 200,
        message: 'success',
        data: {
          page,
          pageSize,
          total: 30,
          totalPage: 3,
          list: Array(10)
            .fill('')
            .map((_, index) => ({ id: (page - 1) * pageSize + index, name: `Cell${(page - 1) * pageSize + index}` })),
        },
      });
    }, 2000);
  });
}

/**
 * 当在Tabs下使用时，需要保证每个Tab下的组件的queryKey是唯一的，否则会出现切换Tab时数据错乱的问题
 */
function LongList({ orderDate }: { orderDate: Date; uniqKey: string }) {
  const { data, loading, noMoreData, loadMore, loadingMore, refresh } = useInfiniteScroll(
    params =>
      fetchData({
        ...params,
        orderDate,
      }),
    {
      refreshDeps: [orderDate],
    }
  );

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
