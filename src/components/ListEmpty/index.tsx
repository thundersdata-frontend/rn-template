import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Color, Size } from '../../config';

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.backgroundColor
  }
});

const ListEmpty = (props: { height: number }) => {
  const { height } = props;
  return (
    <View style={[styles.box, { height }]}>
      <Text style={{ fontSize: Size.px(40), color: Color.helpTextColor }}>暂无数据</Text>
    </View>
  );
};

ListEmpty.defaultProps = {
  height: Size.px(300)
};

export default ListEmpty;
