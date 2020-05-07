/*
 * @文件描述: 带有预览图片的商品列表的item
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2020-05-06 16:56:48
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-07 16:47:01
 */
import React from 'react';
import { TouchableOpacity, Text, Image, ImageSourcePropType } from 'react-native';
import { Size, Color } from '../../config';
import { Flex } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemText from '../ListItemText';

const px = Size.px;

interface BlockItemInter {
  source: ImageSourcePropType; //图片url
  title: string; //商品title
  content: string; //商品描述
  navigateTo?: string; //跳转url
}

const ImgLinkItem = ({ source, title, content, navigateTo }: BlockItemInter) => {
  const navigation = useNavigation();

  return (
    <Flex direction="column" align="start" style={{ width: px(170), marginBottom: px(12) }}>
      <TouchableOpacity
        onPress={
          navigateTo
            ? () => {
                navigation.navigate(navigateTo);
              }
            : undefined
        }>
        <Image source={source} width={px(80)} height={px(80)} style={{ width: px(170), height: px(170) }} />
      </TouchableOpacity>
      <ListItemText style={{ marginTop: px(6) }} text={title} />
      <Text style={{ color: Color.helpTextColor, fontSize: px(12), lineHeight: px(17) }}>{content}</Text>
    </Flex>
  );
};

export default ImgLinkItem;
