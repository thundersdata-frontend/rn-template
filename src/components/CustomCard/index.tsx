/*
 * @文件描述:默认卡片
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2020-05-06 16:15:19
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-05-06 18:00:26
 */
import React from 'react';
import { View, StyleProp, ViewStyle, Text } from 'react-native';
import { Card, Flex, Button } from '@ant-design/react-native';
import { THUMB_URL } from '../../common';
import { Color } from '../../config';

interface CustomCardProps {
  style?: StyleProp<ViewStyle>;
  title?: string | React.ReactElement; //卡片头标题
  thumb?: string | React.ReactElement; //卡片头图片
  extra?: string | React.ReactElement; //卡片头右侧
  content?: React.ReactElement; //卡片内容
  footer?: string | React.ReactElement; //底部(一般放标签)
  onOk?: () => void; //点击确认，如果传则自动添加确认取消按钮
  onCancle?: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({
  content,
  title,
  extra,
  footer,
  onOk,
  onCancle,
  thumb = THUMB_URL
}) => {
  return (
    <View>
      <Card.Header title={title} thumbStyle={{ width: 20, height: 20 }} thumb={thumb} extra={extra} />
      <Card.Body>{content}</Card.Body>
      <Card.Footer content={footer} />
      {onOk && onCancle && (
        <Flex>
          <Button
            style={{ flex: 1, borderRadius: 0 }}
            onPress={() => {
              onCancle();
            }}>
            <Text style={{ color: Color.middleTextColor }}>取消</Text>
          </Button>
          <Button
            style={{ flex: 1, borderRadius: 0 }}
            onPress={() => {
              onOk();
            }}>
            <Text style={{ color: Color.primary }}>确认</Text>
          </Button>
        </Flex>
      )}
    </View>
  );
};

export default CustomCard;
