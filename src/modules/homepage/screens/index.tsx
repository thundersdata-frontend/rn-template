import { useState } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import useSWR from 'swr';
import { useUpdateAtom } from 'jotai/utils';
import { Button, WhiteSpace } from '@td-design/react-native';

import { authAtom } from 'modules/auth/authService';
import { Container } from 'components/Container';

const { fetch, url } = API.authorization.resource.listResource;

export function Homepage({ navigation }: { navigation: StackNavigationProp<MainStackParamList, 'Homepage'> }) {
  const updateAuth = useUpdateAtom(authAtom);

  const [shouldFetch, setShouldFetch] = useState(false);
  const {} = useSWR(shouldFetch ? url : null, fetch);

  const logout = () => {
    updateAuth({ signedIn: false });
  };

  const getData = () => {
    setShouldFetch(true);
  };

  return (
    <Container hasHeader={false}>
      <View>
        <Text>我是首页</Text>
      </View>
      <Button onPress={logout} title="退出登录" />
      <WhiteSpace />
      <Button onPress={getData} title="调接口" />
      <WhiteSpace />
      <Button onPress={() => AsyncStorage.setItem('token', '123')} title="保存数据" />
      <WhiteSpace />
      <Button onPress={() => console.log(AsyncStorage.getItem('token'))} title="获取数据" />
      <WhiteSpace />
      <Button onPress={() => navigation.navigate('Mine')} title="去我的页面" />
      <WhiteSpace />
      {/* <Input /> */}
      {/* <SearchBar /> */}
      {/* <NoticeBar text="我是通知我是通知我是通知我是通知我是通知我是通知22222" /> */}
    </Container>
  );
}
