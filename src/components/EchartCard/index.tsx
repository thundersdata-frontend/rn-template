/*
 * @文件描述: 承载图表的展示组件
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-09-30 14:32:24
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-18 17:28:48
 */
import React from 'react';
import { Card, WingBlank } from '@ant-design/react-native';
import { Text, View, StyleSheet } from 'react-native';
import HtmlView from 'react-native-htmlview';
import Iconfont from '../Iconfont';
import { Size, Colors, htmlStyle } from '../../config';
import HorizontalBarChart from '../HorizontalBarChart';
import { BaseQuotaType, EChartOption } from '../../interfaces/common';
import DataEmpty from '../DataEmpty';
import { isOptionEmpty } from '../../utils/chart-option';
import MemoEcharts from '../MemoEcharts';

export interface EchartCardProps {
  /** 容器组件的名字 */
  title: string;
  /** 容器组件名字前面的图标 */
  thumb: string;
  /** 图表的option */
  option?: EChartOption;
  /** 图表的高度 */
  height: number;
  /** 图表说明 */
  summary?: string;
  /** 图表类型，如果是true，则用HorizontalBarChart组件 */
  top?: boolean;
  /**  */
  topData?: BaseQuotaType[];
}
const EchartCard: React.FC<EchartCardProps> = ({ title, thumb, option, height, summary, top, topData = [] }) => {
  return (
    <WingBlank size="md">
      <Card style={{ borderWidth: 0 }}>
        <Card.Header
          title={<Text style={{ marginLeft: Size.px(10) }}>{title}</Text>}
          thumb={<Iconfont name={thumb} size={Size.px(20)} color={Colors.primary} />}
          style={{ height: Size.px(44) }}
        />
        <Card.Body>
          <View style={styles.html}>
            <HtmlView stylesheet={htmlStyle} value={summary || ''} />
          </View>
          {top ? (
            <DataEmpty visible={topData === null || topData.length === 0}>
              <HorizontalBarChart data={topData} />
            </DataEmpty>
          ) : (
            <DataEmpty visible={isOptionEmpty(option!)}>
              <MemoEcharts option={option!} height={height} />
            </DataEmpty>
          )}
        </Card.Body>
      </Card>
    </WingBlank>
  );
};

EchartCard.defaultProps = {
  top: false,
};

export default EchartCard;

const styles = StyleSheet.create({
  html: {
    padding: Size.px(16),
    paddingTop: 0,
  },
});
