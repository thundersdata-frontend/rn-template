/*
 * @文件描述: 水平柱图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-09-29 19:25:00
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-18 17:29:55
 */

import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { Color, Size } from '../../config';
import { BaseQuotaType } from '../../interfaces/common';
import { valueFormat } from '../../utils/string';
import { WingBlank } from '@ant-design/react-native';
import { isEqual } from 'lodash';

interface HorizontalBarChartProps {
  data: BaseQuotaType[];
  style?: ViewStyle;
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = props => {
  const { data, style } = props;

  const getNumberStyle = (index: number) => {
    let numStyle;
    switch (index) {
      case 0:
        numStyle = { ...styles.topNum, ...styles.first };
        break;
      case 1:
        numStyle = { ...styles.topNum, ...styles.second };
        break;
      case 2:
        numStyle = { ...styles.topNum, ...styles.third };
        break;
      default:
        numStyle = styles.numberIcon;
        break;
    }
    return numStyle;
  };

  const renderList = (list: BaseQuotaType[]) =>
    list.map(({ name, value, unit, percentage }, index) => (
      <View key={`${name}_${index}`} style={styles.item}>
        <View style={styles.number}>
          <Text style={getNumberStyle(index)}>{index + 1}</Text>
        </View>
        <View style={styles.itemContent}>
          <View style={styles.itemText}>
            <Text>{name}</Text>
            <Text>{`${valueFormat(value)}${unit}`}</Text>
          </View>
          <View style={styles.percentBack}>
            <View style={{ ...styles.percent, width: `${percentage}%` }} />
          </View>
        </View>
      </View>
    ));

  return (
    <WingBlank size="md">
      {data && data.length > 0 && <View style={[styles.container, style]}>{renderList(data)}</View>}
    </WingBlank>
  );
};

export default React.memo(HorizontalBarChart, (prev, next) => {
  return isEqual(next.data, prev.data);
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.backgroundColor
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Size.px(35),
    marginBottom: Size.px(16)
  },
  number: {
    width: Size.px(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: Size.px(12)
  },
  numberIcon: {
    width: Size.px(16),
    height: Size.px(16),
    lineHeight: Size.px(16),
    borderRadius: Size.px(8),
    color: Color.white,
    backgroundColor: '#86c6f4',
    textAlign: 'center',
    overflow: 'hidden'
  },
  topNum: {
    width: Size.px(20),
    height: Size.px(20),
    borderRadius: Size.px(10),
    color: Color.white,
    textAlign: 'center',
    borderWidth: Size.px(3),
    overflow: 'hidden'
  },
  first: {
    backgroundColor: '#fddb8a',
    borderColor: '#fcbb1f'
  },
  second: {
    backgroundColor: '#cecece',
    borderColor: '#b8b8b8'
  },
  third: {
    backgroundColor: '#fbb78a',
    borderColor: '#f9751d'
  },
  itemContent: {
    flex: 1
  },
  itemText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Size.px(8)
  },
  percentBack: {
    height: Size.px(8),
    backgroundColor: '#f3f9fe',
    width: '100%'
  },
  percent: {
    backgroundColor: '#218ee9',
    height: Size.px(8),
    borderTopRightRadius: Size.px(4),
    borderBottomRightRadius: Size.px(4)
  }
});
