/*
 * @文件描述: 概览组件
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-09-27 14:30:31
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-15 11:48:36
 */
import React from 'react';
import { WingBlank, Card, Flex } from '@ant-design/react-native';
import { Text, StyleSheet, View } from 'react-native';
import { Color, Size } from '../../config';
import { SelectOption } from '../../interfaces/common';
import Iconfont from '../Iconfont';

interface ListType extends SelectOption {
  unit?: string;
}

export interface OverviewProps {
  /** 概览的标题 */
  title: string;
  /** 概览的内容 */
  list: ListType[];
  icon?: string;
}
const Overview: React.FC<OverviewProps> = ({ title, list, icon }) => {
  const header = (
    <View style={styles.titleItem}>
      {icon && <Iconfont style={{ marginRight: Size.px(8) }} name={icon} size={Size.px(20)} color={Color.primary} />}
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <WingBlank size="md">
      <Card style={{ borderColor: 'rgba(0, 0, 0, 0)' }}>
        <Card.Header title={header} style={styles.header} />
        <Card.Body style={{ borderTopColor: '#f3f3f3' }}>
          <Flex justify="between" align="center" style={styles.body}>
            {list.map((item, index) => (
              <Flex.Item key={index}>
                <Flex direction="column" justify="center" align="center">
                  <Text style={styles.label}>{`${item.label}${item.unit ? `(${item.unit})` : ''}`}</Text>
                  <Text style={styles.value}>{item.value}</Text>
                </Flex>
              </Flex.Item>
            ))}
          </Flex>
        </Card.Body>
      </Card>
    </WingBlank>
  );
};

export default Overview;

const styles = StyleSheet.create({
  header: {
    height: Size.px(45),
    lineHeight: Size.px(45)
  },
  body: {
    height: Size.px(95)
  },
  label: {
    color: Color.labelColor,
    fontSize: Size.px(12),
    lineHeight: Size.px(15)
  },
  value: {
    color: Color.black,
    fontSize: Size.px(20),
    fontWeight: 'bold',
    height: Size.px(28),
    lineHeight: Size.px(28)
  },
  titleItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontSize: Size.px(16)
  }
});
