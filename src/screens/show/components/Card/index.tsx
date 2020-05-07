import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Container from '../../../../components/Container';
import ChartWrap from '../../../../components/ChartWrap';
import { Size, Color } from '../../../../config';
import { Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';
import CustomTag from '../../../../components/CustomTag';
import CustomCard from '../../../../components/CustomCard';
import ImgLinkItem from '../../../../components/ImgLinkItem';
import { THUMB_URL } from '../../../../common';
import ListItemText from '../../../../components/ListItemText';
const { CheckableTag } = CustomTag;

const px = Size.px;

export default function CardPage() {
  const [selectedEvent, setSelectedEvent] = useState<number[]>([0]);

  const toggleSelectedEvent = (key: number) => {
    const isSelected = selectedEvent.indexOf(key) > -1;

    if (isSelected) {
      setSelectedEvent(selectedEvent.filter(item => item !== key));
    } else {
      setSelectedEvent(selectedEvent.concat(key));
    }
  };

  const tags = ['哈哈', '啦啦啦', '哒哒哒哒'];

  return (
    <Container>
      <ScrollView>
        <ChartWrap title="标签">
          <Flex wrap="wrap">
            {tags.map((item, index) => (
              <CheckableTag
                key={index}
                name={item}
                isSelected={selectedEvent.indexOf(index) > -1}
                onPress={() => toggleSelectedEvent(index)}
                isWithIcon={true}
              />
            ))}
          </Flex>
          <Flex wrap="wrap">
            {tags.map((item, index) => (
              <CheckableTag
                key={index}
                name={item}
                isSelected={selectedEvent.indexOf(index) > -1}
                onPress={() => toggleSelectedEvent(index)}
                size="small"
              />
            ))}
          </Flex>
          <Flex wrap="wrap">
            <CustomTag>blue标签</CustomTag>
            <CustomTag type="green">标签</CustomTag>
            <CustomTag type="yellow"> 标签</CustomTag>
            <CustomTag type="red"> 标签</CustomTag>
          </Flex>
        </ChartWrap>
        <ChartWrap title="默认卡片" padding={0}>
          <CustomCard
            title="标题"
            extra="2020/01/01 12:00"
            thumb={THUMB_URL}
            content={
              <WingBlank>
                <View>
                  <ListItemText style={{ marginVertical: px(8) }} text="我是标题" />
                  <Text style={{ color: Color.middleTextColor, fontSize: px(14), lineHeight: px(22) }}>
                    描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息
                    描述信息 描述信息 描述信息 描述信息
                  </Text>
                </View>
              </WingBlank>
            }
            footer={
              <Flex style={{ marginVertical: px(12) }}>
                <CustomTag>blue</CustomTag>
                <CustomTag type="green">green</CustomTag>
                <CustomTag type="yellow"> yellow</CustomTag>
              </Flex>
            }
          />

          <WhiteSpace style={{ backgroundColor: Color.backgroundColor }} />
          <CustomCard
            content={
              <WingBlank>
                <View>
                  <ListItemText style={{ marginVertical: px(8) }} text="我是标题" />
                  <Text style={{ color: Color.middleTextColor, fontSize: px(14), lineHeight: px(22) }}>
                    描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息 描述信息
                    描述信息 描述信息 描述信息 描述信息
                  </Text>
                </View>
              </WingBlank>
            }
            onOk={() => console.log('ok')}
            onCancel={() => console.log('cancel')}
          />
        </ChartWrap>
        <WhiteSpace style={{ backgroundColor: Color.backgroundColor }} />
        <WhiteSpace />
        <WingBlank>
          <Flex wrap="wrap" justify="between">
            <ImgLinkItem
              title="标题"
              content="描述信息 描述信息"
              source={require('../../../../assets/pic_add_picture.png')}
            />
            <ImgLinkItem
              title="标题"
              content="描述信息 描述信息"
              source={require('../../../../assets/pic_add_picture.png')}
            />
            <ImgLinkItem
              title="标题"
              content="描述信息 描述信息"
              source={require('../../../../assets/pic_add_picture.png')}
            />
          </Flex>
        </WingBlank>
      </ScrollView>
    </Container>
  );
}
