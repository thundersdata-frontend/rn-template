/*
 * @文件描述: 柱图/线图综合图表
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2019-11-28 16:40:22
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-04-29 20:51:29
 */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';

import { FILTER_OPTION_DAY_MONTH_QUARTER_YEAR } from '../../../../../../common';
import { valueType, BaseChartOption } from '../../../../../../interfaces/common';
import SearchPicker from '../../../../../../components/SearchPicker';
import RadioButtonGroup from '../../../../../../components/RadioButtonGroup';
import { isOptionEmpty, getBaseTrendOption } from '../../../../../../utils/chart-option';
import DataEmpty from '../../../../../../components/DataEmpty';
import MemoEcharts from '../../../../../../components/MemoEcharts';
import { Color, Size } from '../../../../../../config';
import Container from '../../../../../../components/Container';

const BaseTrendChart = () => {
  const [dateType, setDateType] = useState<valueType>('month');
  const [divisionId, setDivisionId] = useState<valueType[]>([]);

  const selectDivision = (value: any) => {
    setDivisionId(value || '');
  };

  const mockData = {
    xAxis: [
      {
        type: 'category',
        name: '',
        data: ['01月', '03月', '05月', '07月', '09月', '11月']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '每月进度跟踪(元)'
      },
      {
        type: 'value',
        name: '%'
      }
    ],
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [],
        yAxisIndex: 0
      },
      {
        name: '滚动预算',
        type: 'bar',
        data: [
          { name: '01月', value: 5000, unit: '元' },
          { name: '03月', value: 7500, unit: '元' },
          { name: '05月', value: 4200, unit: '元' },
          { name: '07月', value: 5000, unit: '元' },
          { name: '09月', value: 5000, unit: '元' },
          { name: '11月', value: 8000, unit: '元' }
        ],
        yAxisIndex: 0
      },
      {
        name: '销量同比',
        type: 'line',
        data: [
          { name: '01月', value: 60, unit: '%' },
          { name: '03月', value: 40, unit: '%' },
          { name: '05月', value: 30, unit: '%' },
          { name: '07月', value: 50, unit: '%' },
          { name: '09月', value: 70, unit: '%' },
          { name: '11月', value: 90, unit: '%' }
        ],
        yAxisIndex: 1
      }
    ]
  };

  const option = getBaseTrendOption(mockData as BaseChartOption);
  return (
    <Container>
      <View style={styles.filter}>
        <View>
          <SearchPicker
            data={[
              { value: 0, label: '数据' },
              { value: 1, label: '这里现在是九个字哦' }
            ]}
            value={divisionId}
            onChange={selectDivision}
          />
        </View>
        <View style={styles.filterRight}>
          <RadioButtonGroup
            data={[...FILTER_OPTION_DAY_MONTH_QUARTER_YEAR]}
            value={dateType}
            onChange={value => setDateType(`${value}`)}
          />
        </View>
      </View>
      <WhiteSpace size="lg" />
      <DataEmpty visible={isOptionEmpty(option)}>
        <MemoEcharts option={option} />
      </DataEmpty>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white
  },
  title: {
    fontSize: Size.px(24),
    fontWeight: '600',
    color: Color.black
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default React.memo(BaseTrendChart);
