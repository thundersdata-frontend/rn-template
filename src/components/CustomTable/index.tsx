/*
 * @文件描述:表格模块
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2019-11-27 14:34:15
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-03 10:31:24
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Size, Color } from '../../config';
import DataEmpty from '../DataEmpty';

export interface ColumnProps<T> {
  /** 唯一值，同antd中的dataIndex */
  dataIndex: string;
  /** 表头标题 */
  title?: string;
  /** 根据对应columns的key渲染数据 */
  key?: string;
  /** 同antd中的render() */
  render?: (record: T, index: number, selectedRow?: number) => JSX.Element;
  /** 宽度百分比 */
  width?: number;
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
}

interface CustomTableProps<T> {
  /** 列数组 */
  columns: ColumnProps<T>[];
  /** 表格数据源 */
  dataSource: T[];
  /** 行点击事件 */
  onPress?: (item: T) => void;
  selectedRow?: number;
  selectRow?: (row: number) => void;
  selectRowDisabled?: boolean;
}

function CustomTable<T>({
  columns = [],
  dataSource = [],
  onPress,
  selectedRow,
  selectRow,
  selectRowDisabled
}: CustomTableProps<T>) {
  /**
   * 每列计算出百分比宽度
   * @param columns
   */
  const getColumnsWithWidth = (columns: ColumnProps<T>[]) => {
    const filterColumns = columns.filter(item => !!item.width).map(item => item.width);
    const count = filterColumns.length > 0 ? filterColumns.reduce((pre, next) => pre! + next!) : 0;
    const restLength = columns.length - filterColumns.length;
    const residualMean = restLength > 0 ? (100 - count!) / restLength : 0;
    return columns.map(item => ({ ...item, width: `${item.width || residualMean}%` }));
  };

  const transColumns = getColumnsWithWidth(columns);

  /** 根据key值生成表格体内容 */
  const renderTbody = (list: T[]) =>
    list.map((item, index) => (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        style={[styles.bodyRow, index === selectedRow ? styles.selected : {}]}
        disabled={selectRowDisabled}
        onPress={() => {
          selectRow && selectRow(index);
          onPress && onPress(item);
        }}>
        {transColumns.map(({ dataIndex, render, align, width }) =>
          render ? (
            <View
              key={`${dataIndex}_${index}`}
              style={[styles.tableCell, { width }, align ? styles[`${align}Cell`] : {}]}>
              {render(item, index, selectedRow)}
            </View>
          ) : (
            <Text
              key={`${dataIndex}_${index}`}
              style={[
                styles.tableCell,
                { width },
                { textAlign: align },
                index === selectedRow ? { color: Color.primary } : {}
              ]}>
              {item[dataIndex]}
            </Text>
          )
        )}
      </TouchableOpacity>
    ));

  /** 根据columns生成表格头内容 */
  const renderTableHeader = () => (
    <View style={styles.header}>
      {transColumns.map(({ title, dataIndex, width }) => {
        return (
          <View style={[styles.theadCell, { width }]} key={dataIndex}>
            <Text style={styles.theadText}>{title}</Text>
          </View>
        );
      })}
    </View>
  );

  return (
    <View>
      {renderTableHeader()}
      {dataSource.length > 0 ? renderTbody(dataSource) : <DataEmpty visible={dataSource.length === 0} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.white,
    fontSize: Size.px(12),
    fontWeight: 'bold',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    letterSpacing: Size.px(2)
  },
  bodyRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Color.white,
    fontSize: Size.px(12),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Color.borderColor,
    borderBottomWidth: Size.ONE_PIXEL
  },
  selected: {
    // backgroundColor: 'rgba(255, 79, 2, 0.1)',
  },
  tableCell: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: Size.px(12),
    padding: Size.px(8),
    // overflow: 'hidden',
    color: Color.dark
  },
  leftCell: {
    justifyContent: 'flex-start'
  },
  centerCell: {
    justifyContent: 'center'
  },
  rightCell: {
    justifyContent: 'flex-end'
  },
  theadCell: {
    padding: Size.px(8),
    overflow: 'hidden'
  },
  theadText: {
    color: 'rgba(0,0,0,0.2)',
    fontSize: Size.px(12)
  }
});

const typedMemo: <T>(c: T) => T = React.memo;
export default typedMemo(CustomTable);
