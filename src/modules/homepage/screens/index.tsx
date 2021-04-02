import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import useSWR from 'swr';
import { useUpdateAtom } from 'jotai/utils';
import { Button, WhiteSpace } from '@td-design/react-native';

import authService from 'modules/auth/authService';
import Container from 'components/Container';

const { fetch, url } = API.authorization.resource.listResource;

export default function Homepage({
  navigation,
}: {
  navigation: NativeStackNavigationProp<MainStackParamList, 'Homepage'>;
}) {
  const updateAuth = useUpdateAtom(authService.authAtom);

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
      <Button onPress={() => MMKV.set('token', '123')} title="保存数据" />
      <WhiteSpace />
      <Button onPress={() => console.log(MMKV.getString('token'))} title="获取数据" />
    </Container>
  );
}
