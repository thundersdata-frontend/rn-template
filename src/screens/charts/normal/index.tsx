import React, { useState, useEffect } from 'react';
import { Echarts } from '../../../components/Echarts';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getBaseTrendOption, getBasePieOption } from '../../../utils/chart-option';

const TabDemo = () => {
  const [option, setOption] = useState({});

  useEffect(() => {
    const option = getBaseTrendOption({
      xAxis: [
        {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子'],
        },
      ],
      yAxis: [
        {
          name: '件',
          type: 'value',
        },
      ],
      series: [
        {
          name: '销量',
          type: 'bar',
          yAxisIndex: 0,
          data: [
            { name: '衬衫', value: 400000 },
            { name: '衬衫', value: 6000000 },
            { name: '雪纺衫', value: 7000000 },
            { name: '裤子', value: 3000000 },
          ],
        },
      ],
    });
    setOption(option);
  }, []);

  const changeOption = () => {
    setOption(
      getBasePieOption({
        series: [
          {
            type: 'pie',
            data: [
              { name: '前端', value: 40 },
              { name: '后端', value: 50 },
              { name: '测试的名字很长', value: 10 },
            ],
          },
        ],
      }),
    );
  };

  console.disableYellowBox = true;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changeOption}>
        <Text>change option2</Text>
      </TouchableOpacity>
      <Echarts option={option} />
    </View>
  );
};
export default TabDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
