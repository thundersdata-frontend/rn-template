/*
 * @文件描述: 联赛列表页面
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-15 16:41:51
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-29 15:24:40
 */
import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import Container from '../../components/Container';
import LinearGradient from 'react-native-linear-gradient';
import { Size, Color } from '../../config';
import { WingBlank, Flex } from '@ant-design/react-native';

const { px, DEVICE_WIDTH } = Size;
const LeagueHome = () => {
  return (
    <Container>
      <View style={{ position: 'relative' }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#69C0FF', '#096DD9']}
          style={{ height: px(80), width: Size.DEVICE_WIDTH }}
        />
        <View style={{ backgroundColor: Color.white, width: Size.DEVICE_WIDTH, height: px(75) }} />
        <Flex justify="center" style={{ position: 'absolute', width: DEVICE_WIDTH }}>
          <WingBlank>
            <ImageBackground
              source={require('../../images/pic_my_head.png')}
              style={{
                width: px(350),
                height: px(144),
                marginTop: px(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </WingBlank>
        </Flex>
        <View>
          <Text>内容区</Text>
        </View>
      </View>
    </Container>
  );
};

export default LeagueHome;
