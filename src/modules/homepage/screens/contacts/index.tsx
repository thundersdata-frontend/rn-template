import { Center, Text } from '@td-design/react-native';

import { Container } from '@/components/Container';
import { IndexedBar } from '@/components/IndexedBar';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

import ContactCell from './ContactCell';
import ContactDivider from './ContactDivider';
import ContactHeader from './ContactHeader';
import ContactSectionHeader from './ContactSectionHeader';
import { Contact, contactsData } from './data';

function fetchData(): Promise<AjaxResponse<Page<Contact>>> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 200,
        success: true,
        message: '获取数据成功',
        data: {
          page: 1,
          pageSize: 9999999999,
          total: 9999999999,
          list: contactsData,
        },
      });
    }, 2000);
  });
}

export function ContactsDemo() {
  const { data, refresh, loading } = useInfiniteScroll(fetchData);

  const renderFooter = (length: number) => (
    <Center height={40}>
      <Text>当前好友总数：{length}</Text>
    </Center>
  );

  return (
    <Container>
      <IndexedBar
        data={data}
        indexHeight={22}
        itemHeight={44}
        headerHeight={40}
        renderIndex={item => <ContactSectionHeader title={item} />}
        renderItem={item => <ContactCell contact={item} />}
        extractKey={'lastName'}
        renderSeparator={ContactDivider}
        renderHeader={ContactHeader}
        renderFooter={renderFooter}
        {...{ refresh, loading }}
      />
    </Container>
  );
}
