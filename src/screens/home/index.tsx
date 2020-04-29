/*
 * @文件描述: 首页
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @LastEditors: 黄姗姗
 * @Date: 2020-01-13 20:17:32
 * @LastEditTime: 2020-04-29 11:49:02
 */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Container from '../../components/Container';
import { useNavigation } from '@react-navigation/native';
import { Tabs, WhiteSpace, Carousel, WingBlank } from '@ant-design/react-native';
import { Color, Size } from '../../config';
import GridItems from '../../components/GridItems';
// import useRequest from '@umijs/use-request';

const tabs = [{ title: '选项1' }, { title: '选项2' }, { title: '选项3' }, { title: '选项4' }];

const { px } = Size;

const Home = () => {
  // useRequest(() => API.recruitment.apply.delApply.fetch({ applyCode: '1' }));
  const navigation = useNavigation();

  const handleChange = (index: number) => {
    console.log(index);
  };

  const itemList = [
    { id: 1, name: '名字1' },
    { id: 2, name: '名字2' },
    { id: 3, name: '名字3' },
    { id: 4, name: '名字4' },
    { id: 5, name: '名字5' },
    { id: 6, name: '名字6' },
    { id: 7, name: '名字7' }
  ];

  return (
    <Container>
      <WhiteSpace />
      <Tabs tabs={tabs}>
        <WingBlank>
          <WhiteSpace />
          <Carousel
            style={styles.wrapper}
            autoplay
            infinite
            afterChange={handleChange}
            dotStyle={{ backgroundColor: Color.white }}
            dotActiveStyle={{ backgroundColor: Color.primary }}>
            <View style={[styles.containerHorizontal, { backgroundColor: Color.primary }]}>
              <Text>Carousel 1</Text>
            </View>
            <View style={[styles.containerHorizontal, { backgroundColor: Color.orange }]}>
              <Text>Carousel 2</Text>
            </View>
            <View style={[styles.containerHorizontal, { backgroundColor: Color.success }]}>
              <Text>Carousel 3</Text>
            </View>
          </Carousel>
        </WingBlank>
        <GridItems list={itemList} />
        <GridItems list={itemList} rowNum={4} />
        <View>
          <Text onPress={() => navigation.navigate('Tab')}>去bottomTab页面</Text>
        </View>
      </Tabs>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: px(6)
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: px(144),
    borderRadius: px(6)
  },
  text: {
    color: '#fff',
    fontSize: 36
  }
});

export default Home;
