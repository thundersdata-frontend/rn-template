/*
 * @文件描述: form组件的嵌套 当有error的时候在下面展示
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-10-25 16:05:00
 * @LastEditors: 廖军
 * @LastEditTime: 2019-10-25 16:05:00
 */
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Size } from '../../config';

export interface ShowErrorProps {
  error?: string[];
  style?: ViewStyle;
}

export const ShowError: React.FC<ShowErrorProps> = props => {
  const { error, style } = props;
  return (
    <View>
      {props.children}
      {error && (
        <View style={[styles.error, style]}>
          <Text style={styles.text}>{(error || []).join(',')}</Text>
        </View>
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
  error: {
    padding: Size.px(5),
  },
  text: {
    fontSize: Size.px(14),
    color: 'red',
  },
});

export default ShowError;
