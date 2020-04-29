/*
 * @文件描述: 宫格布局，一行放置3个或4个item
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @LastEditors: 黄姗姗
 * @Date: 2020-04-29 11:49:02
 * @LastEditTime: 2020-04-29 11:49:59
 */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Color, Size } from '../../config';

const { px } = Size;

export declare type RowNum = 3 | 4;

const GridItems: React.FC<{ list: { id: number; name: string }[]; rowNum?: RowNum }> = ({ list = [], rowNum = 3 }) => {
  const _list = list;
  if (list.length % rowNum !== 0) {
    _list.push(...new Array(rowNum - (_list.length % rowNum)).fill('').map(() => ({ id: 999999, name: '' })));
  }

  return (
    <View style={styles.itemWrap}>
      {_list.map((item, index) => {
        if (item.name !== '') {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.item,
                {
                  width: rowNum === 3 ? px(110) : px(80),
                  height: rowNum === 3 ? px(110) : px(80)
                }
              ]}>
              <View style={{ width: px(44), height: px(44), backgroundColor: Color.borderColor }}></View>
              <Text style={{ fontSize: px(12), color: Color.mainTextColor, lineHeight: px(18) }}>{item.name}</Text>
            </TouchableOpacity>
          );
        } else {
          return <View key={index} style={{ width: rowNum === 3 ? px(110) : px(80) }}></View>;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default GridItems;
