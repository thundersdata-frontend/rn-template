/*
 * @文件描述:默认卡片
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2020-05-06 16:15:19
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-07 16:46:33
 */
import React from 'react';
import { View, StyleProp, Text, ImageStyle, StyleSheet } from 'react-native';
import { Card, Flex, Button } from '@ant-design/react-native';
import { Color, Size } from '../../config';

const { px } = Size;

interface CustomCardProps {
  title?: string | React.ReactElement; //卡片头标题
  thumb?: string | React.ReactElement; //卡片头图片
  thumbStyle?: StyleProp<ImageStyle>;
  extra?: string | React.ReactElement; //卡片头右侧
  content?: React.ReactElement; //卡片内容
  footer?: string | React.ReactElement; //底部(一般放标签)
  onOk?: () => void; //点击确认，如果传则自动添加确认取消按钮
  onCancel?: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({
  content,
  title,
  extra,
  footer,
  onOk,
  onCancel,
  thumb,
  thumbStyle = { width: px(20), height: px(20) }
}) => {
  return (
    <View>
      {(title || extra || thumb) && (
        <Card.Header styles={cardStyle} title={title} thumbStyle={thumbStyle} thumb={thumb} extra={extra} />
      )}
      <Card.Body>{content}</Card.Body>
      <Card.Footer content={footer} />
      {onOk && onCancel && (
        <Flex>
          <Button style={{ flex: 1, borderRadius: 0 }} onPress={onCancel}>
            <Text style={{ color: Color.middleTextColor }}>取消</Text>
          </Button>
          <Button style={{ flex: 1, borderRadius: 0 }} onPress={onOk}>
            <Text style={{ color: Color.primary }}>确认</Text>
          </Button>
        </Flex>
      )}
    </View>
  );
};

const cardStyle = StyleSheet.create({
  card: {
    borderWidth: 0
  },
  headerTitle: {
    height: px(44)
  },
  headerContent: {
    fontSize: px(14),
    color: Color.mainTextColor,
    fontWeight: '400'
  },
  headerWrap: {
    paddingVertical: 0
  },
  headerExtra: {
    fontSize: px(12),
    color: Color.helpTextColor
  }
});

export default CustomCard;
