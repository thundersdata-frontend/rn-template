/**
 * @功能描述: 渲染预警提醒Tip
 * @参数:text：预警消息
 * navigateTo : 跳转到的stack name
 * @返回值:
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, NoticeBar } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { Size, Color } from '../../config';

const { px } = Size;

interface TodoTipProps {
  text: string; //预警文字
  navigateTo: string; //跳转stackName
}

export default function TodoTip(props: TodoTipProps) {
  const navigation = useNavigation();
  const { text, navigateTo } = props;

  return (
    <View style={styles.warn}>
      <NoticeBar
        icon={<Icon name="bell" size={px(16)} color={Color.fail} />}
        mode="link"
        onPress={() => navigation.navigate(navigateTo)}>
        {text}
      </NoticeBar>
    </View>
  );
}

const styles = StyleSheet.create({
  warn: {
    marginVertical: px(8)
  }
});
