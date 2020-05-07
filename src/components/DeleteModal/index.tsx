/*
 * @文件描述: 左滑删除点击后的弹窗
 * @公司: thundersdata
 * @作者: 于效仟
 * @Date: 2019-10-11 09:46:00
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-04-30 16:46:43
 */
import React from 'react';
import { Text, Image } from 'react-native';
import { Color, Size } from '../../config';
import { Flex, Modal } from '@ant-design/react-native';

export interface DeleteModalProps {
  content?: React.ReactElement;
  onDelete?: () => void;
}

export const deleteModal = ({ content, onDelete }: DeleteModalProps) => {
  Modal.alert(
    '',
    content || (
      <Flex direction="column">
        <Image
          style={{ alignItems: 'center', justifyContent: 'center' }}
          source={require('../../assets/icons/pic_modal_warning.png')}
        />
        <Text style={{ marginVertical: Size.px(14), fontSize: Size.px(18) }}>删除</Text>
        <Text style={{ color: Color.grey }}> 是否确认删除该信息?</Text>
      </Flex>
    ),
    [
      {
        text: '删除',
        onPress: onDelete,
        style: { color: Color.red }
      },
      { text: '取消', onPress: () => console.log('取消'), style: { color: Color.grey } }
    ]
  );
};
