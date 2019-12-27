import React, { useState, useEffect } from 'react';
import MemoEcharts from '../../../components/MemoEcharts';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getBaseMapOption } from '../../../utils/chart-option';

const TabDemo = () => {
  const [option, setOption] = useState({});

  useEffect(() => {
    setOption(
      getBaseMapOption({
        series: [
          {
            type: 'map',
            data: [{ name: '新疆', value: 100 }],
          },
        ],
      }),
    );
  }, []);

  const changeOption = () => {
    setOption(
      getBaseMapOption({
        series: [
          {
            type: 'map',
            data: [{ name: '山东', value: 180 }],
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
      <MemoEcharts option={option} />
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
