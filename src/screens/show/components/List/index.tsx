import React, { useState } from 'react';
import { ScrollView, Image, Text } from 'react-native';
import Container from '../../../../components/Container';
import TodoTip from '../../../../components/TodoTip';
import { List, SwipeAction, WingBlank, WhiteSpace } from '@ant-design/react-native';
import CustomAccordion from '../../../../components/CustomAccordion';
import color from '../../../../config/color';
import { Size } from '../../../../config';
import CustomListItem from '../../../../components/CustomListItem';
import { deleteModal } from '../../../../components/DeleteModal';
import { THUMB_URL } from '../../../../common';

export default function ShowList() {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [activeSections2, setActiveSections2] = useState<number[]>([]);

  const handleDelete = () => {
    console.log('handleDelete');
  };

  return (
    <Container>
      <ScrollView>
        <TodoTip text="有10条预警消息，请及时处理" navigateTo={'HomePage'} />

        <List renderHeader={'List header'}>
          <CustomListItem title="主要信息" thumb={THUMB_URL} extra="描述信息" />

          <SwipeAction
            autoClose
            style={{ backgroundColor: 'transparent' }}
            right={[
              {
                text: '删除',
                onPress: () => deleteModal({ onDelete: handleDelete }),
                style: { backgroundColor: 'red', color: 'white' }
              }
            ]}>
            <List.Item extra="左滑删除">信息</List.Item>
          </SwipeAction>
          <CustomListItem title="主要信息" navigateTo="Show" thumb={THUMB_URL} />
          <CustomListItem title="主要信息" brief="附标题" thumb={THUMB_URL} />
          <CustomListItem
            title="主要信息"
            brief="附标题"
            navigateTo="Show"
            style={{ minHeight: Size.px(70) }}
            thumb={
              <Image
                source={require('../../../../assets/pic_add_picture.png')}
                style={{ width: Size.px(50), height: Size.px(50), marginRight: Size.px(10) }}
                resizeMode="contain"
              />
            }
          />
        </List>
        <CustomAccordion
          activeSections={activeSections}
          onChange={setActiveSections}
          sections={[
            {
              title: '手风琴-List',
              style: {},
              content: (
                <List>
                  <CustomListItem title="主要信息" style={{ backgroundColor: color.backgroundColor }} />
                  <CustomListItem
                    title="主要信息"
                    style={{ backgroundColor: color.backgroundColor }}
                    thumb={THUMB_URL}
                  />
                </List>
              )
            }
          ]}
        />
        <CustomAccordion
          activeSections={activeSections2}
          onChange={setActiveSections2}
          sections={[
            {
              title: '手风琴-TextArea',
              style: {},
              content: (
                <WingBlank size="md" style={{ backgroundColor: color.backgroundColor }}>
                  <WhiteSpace />
                  <Text style={{ color: 'rgba(0,0,0,0.6)' }}>
                    描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息
                  </Text>
                  <WhiteSpace />
                </WingBlank>
              )
            }
          ]}
        />
        <WhiteSpace />
      </ScrollView>
    </Container>
  );
}
