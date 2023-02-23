import { Center, Text } from '@td-design/react-native';

import { IndexedBar } from '@/components';
import { useRefreshService } from '@/hooks/useRefreshService';

import ContactCell from './ContactCell';
import ContactDivider from './ContactDivider';
import ContactHeader from './ContactHeader';
import ContactSectionHeader from './ContactSectionHeader';
import { Contact, contactsData } from './data';

function fetchData(): Promise<Page<Contact>> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        page: 1,
        pageSize: 9999999999,
        total: 9999999999,
        list: contactsData,
      });
    }, 2000);
  });
}

export function ContactsDemo() {
  const { data, onRefresh, refreshing } = useRefreshService<Contact>(fetchData);

  const renderFooter = (length: number) => (
    <Center height={40}>
      <Text>当前好友总数：{length}</Text>
    </Center>
  );

  return (
    <IndexedBar
      data={data}
      indexHeight={22}
      itemHeight={44}
      headerHeight={80}
      renderIndex={item => <ContactSectionHeader title={item} />}
      renderItem={item => <ContactCell contact={item} />}
      extractKey={'lastName'}
      onRefresh={onRefresh}
      refreshing={refreshing}
      renderSeparator={ContactDivider}
      renderHeader={ContactHeader}
      renderFooter={renderFooter}
    />
  );
}
