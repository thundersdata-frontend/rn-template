/*
 * @文件描述: 没有数据时的显示组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-10-11 09:46:00
 * @LastEditors: 廖军
 * @LastEditTime: 2019-10-11 14:21:00
 */
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Image } from 'react-native';
import { Colors, Size } from '../../config';

export interface DataEmptyProps {
  visible: boolean;
  style?: ViewStyle;
}

export const DataEmpty: React.FC<DataEmptyProps> = props => {
  const { visible, style } = props;
  return (
    <View>
      {visible ? (
        <View style={[styles.container, style]}>
          <Image source={require('../../assets/pic_empty.png')} />
          <Text style={styles.text}>暂无数据</Text>
        </View>
      ) : (
        props.children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Size.px(300),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  text: {
    fontSize: Size.px(16),
    color: '#dcdcdc',
  },
});

export default DataEmpty;
