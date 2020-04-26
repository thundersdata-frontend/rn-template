import React from 'react';
import Color from './color';
import Size from './size';
import { View } from 'react-native';
import Iconfont from '../components/Iconfont';

export default {
  // 主色调的配置
  primaryStyle: {
    headerStyle: {
      backgroundColor: 'transparent'
    },
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      flex: 1,
      color: Color.white,
      fontWeight: 'normal',
      fontSize: Size.px(18)
    },
    headerBackTitle: null,
    headerRight: <View />,
    headerBackImage: (
      <Iconfont name="navBack" color={Color.white} size={Size.px(18)} style={{ marginLeft: Size.px(3) }} />
    )
  }
};
