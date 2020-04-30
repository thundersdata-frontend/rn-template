/*
 * @文件描述: 球队-列表页面
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @LastEditors: 黄姗姗
 * @Date: 2020-01-07 15:35:12
 * @LastEditTime: 2020-04-29 15:56:22
 */
import React from 'react';
import { Text, View } from 'react-native';
import Container from '../../components/Container';
import TabButton from '../../components/TabButton';
import { WhiteSpace } from '@ant-design/react-native';

const Teams = () => {
  const tabs = [{ title: '选项1' }, { title: '选项2' }, { title: '选项3' }, { title: '选项4' }];
  return (
    <Container>
      <WhiteSpace />
      <TabButton tabs={tabs}>
        <View>
          <Text>选项1</Text>
        </View>
        <View>
          <Text>选项2</Text>
        </View>
        <View>
          <Text>选项3</Text>
        </View>
        <View>
          <Text>选项4</Text>
        </View>
      </TabButton>
    </Container>
  );
};

export default Teams;
