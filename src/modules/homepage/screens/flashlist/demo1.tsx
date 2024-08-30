import { Box, Text, WhiteSpace } from '@td-design/react-native';

import { Container } from '@/components/Container';
import { Empty } from '@/components/Empty';
import { LargeList } from '@/components/LargeList';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface DataType {
  id: number;
  name: string;
}

function fetchData({ page = 1, pageSize = 10 }: PageParams & Obj): Promise<AjaxResponse<Page<DataType>>> {
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
            .map((_, index) => ({ id: (page - 1) * pageSize + index, name: `Cell${(page - 1) * pageSize + index}` })),
        },
      });
    }, 2000);
  });
}

export function FlashListDemo1() {
  const renderItem = ({ item }: { item: DataType }) => (
    <Box height={200} alignItems="center" justifyContent={'center'} backgroundColor={'func200'}>
      <Text>{item.name}</Text>
    </Box>
  );

  const { data, loading, noMoreData, loadMore, loadingMore, refresh } = useInfiniteScroll(fetchData);

  console.log(loading, loadingMore, noMoreData);

  return (
    <Container>
      <LargeList
        keyExtractor={'id'}
        estimatedItemSize={200}
        renderSeparator={() => <WhiteSpace />}
        renderEmpty={height => <Empty height={height} />}
        {...{ renderItem, data, refresh, loadMore, loading, loadingMore, noMoreData }}
      />
    </Container>
  );
}
