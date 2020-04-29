/**
 * @功能描述: 渲染预警提醒Tip
 * @参数:totalNumber：预警消息个数
 * navigateTo : 跳转到的stack name
 * @返回值:
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { Size, Color } from '../../config';

const { px } = Size;

interface TodoTipProps {
  text: string; //预警文字
  navigateTo: string; //跳转stackname
}

export default function TodoTip(props: TodoTipProps) {
  const navigation = useNavigation();
  const { text, navigateTo } = props;

  return (
    <TouchableOpacity style={styles.warn} onPress={() => navigation.navigate(navigateTo)}>
      <View style={styles.warningWrap}>
        <Icon name="bell" color={Color.warning} />
        <Text style={styles.warnContent}>{text}</Text>
      </View>
      <View style={styles.arrowSign}>
        <Text style={styles.arrowSignText}>
          <Icon name="right" color={Color.warning} />
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  warn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff5da',
    padding: px(10),
    borderRadius: 4,
    marginVertical: px(8),
    justifyContent: 'space-between'
  },
  warnContent: {
    color: '#F0412C',
    fontSize: px(14),
    marginLeft: px(10)
  },
  arrowSign: {
    marginTop: px(-4),
    marginLeft: px(10)
  },
  arrowSignText: {
    color: Color.red,
    fontSize: px(22)
  },
  warningWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
