import { Box, Text, WhiteSpace } from '@td-design/react-native';

import { Container } from '@/components/Container';
import { Empty } from '@/components/Empty';
import { LargeList } from '@/components/LargeList';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface DataType {
  id: number;
  name: string;
}

function fetchData(params: PageParams & Obj): Promise<AjaxResponse<Page<DataType>>> {
  const { page, pageSize } = params;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 20000,
        success: true,
        data: {
          page,
          pageSize,
          total: 30,
          totalPage: 3,
          list: Array(10)
            .fill('')
            .map((_, index) => ({ id: (page - 1) * pageSize + index, name: `Cell${(page - 1) * pageSize + index}` })),
        },
        message: '',
      });
    }, 2000);
  });
}

export function FlashListDemo3() {
  const renderItem = ({ item }: { item: DataType }) => (
    <Box height={200} alignItems="center" justifyContent={'center'} backgroundColor={'func200'}>
      <Text>{item.name}</Text>
    </Box>
  );

  /**
   * 这种写法，就是说d实际上是useInfiniteScroll里面service传过来的参数，即page和pageSize，然后加上name才是真正的参数。
   */
  const { data, loading, loadingMore, noMoreData, refresh, loadMore } = useInfiniteScroll(d =>
    fetchData({
      ...d,
      name: 'aaa',
    })
  );

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
