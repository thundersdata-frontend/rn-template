import { Box, Text, WhiteSpace } from '@td-design/react-native';

import { Container } from '@/components/Container';
import { Empty } from '@/components/Empty';
import { LargeList } from '@/components/LargeList';
import { useRefreshService } from '@/hooks/useRefreshService';

interface DataType {
  id: number;
  name: string;
}

function fetchData({
  page = 1,
  pageSize = 10,
  ...rest
}: { page: number; pageSize: number } & Obj): Promise<Page<DataType>> {
  console.log(page, pageSize, rest);
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
  const renderItem = ({ item }: { item: DataType }) => (
    <Box height={200} alignItems="center" justifyContent={'center'} backgroundColor={'func200'}>
      <Text>{item.name}</Text>
    </Box>
  );

  const { data, loading, refresh, loadMore } = useRefreshService(params =>
    fetchData({
      ...params,
      type: 1,
    })
  );

  return (
    <Container>
      <LargeList
        keyExtractor={item => item.id + ''}
        estimatedItemSize={200}
        renderSeparator={() => <WhiteSpace />}
        renderEmpty={height => <Empty height={height} />}
        {...{ renderItem, data, refresh, loadMore, loading }}
      />
    </Container>
  );
}
