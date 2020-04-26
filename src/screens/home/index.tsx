/*
 * @文件描述: 首页
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @LastEditors: 黄姗姗
 * @Date: 2020-01-13 20:17:32
 * @LastEditTime: 2020-04-26 18:55:17
 */
import React from 'react';
import { ScrollView, Text } from 'react-native';
import Container from '../../components/Container';
import { Color } from '../../config';
// import useRequest from '@umijs/use-request';

const Home = () => {
  // useRequest(() => API.recruitment.apply.delApply.fetch({ applyCode: '1' }));

  return (
    <Container>
      <ScrollView style={{ backgroundColor: Color.backgroundColor }}>
        <Text>首页</Text>
      </ScrollView>
    </Container>
  );
};

export default Home;
