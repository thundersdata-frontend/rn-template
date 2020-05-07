import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Container from '../../../../components/Container';
import ChartWrap from '../../../../components/ChartWrap';
import { Size, Color } from '../../../../config';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import CustomTag from '../../../../components/CustomTag';
import CustomCard from '../../../../components/CustomCard';
import ImgLinkItem from '../../../../components/ImgLinkItem';
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

  const tags = ['哈哈哈', '啦啦啦', '哒哒哒'];

  return (
    <Container>
      <ScrollView>
        <ChartWrap title="标签">
          <Flex wrap="wrap" style={{ marginVertical: Size.px(5) }}>
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
          <Flex wrap="wrap" style={{ marginVertical: Size.px(5) }}>
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
          <Flex wrap="wrap" style={{ marginVertical: Size.px(5) }}>
            <CustomTag>blue</CustomTag>
            <CustomTag type="green">green</CustomTag>
            <CustomTag type="yellow"> yellow</CustomTag>
            <CustomTag type="red"> red</CustomTag>
          </Flex>
        </ChartWrap>
        <ChartWrap title="默认卡片" padding={0}>
          <CustomCard
            title="标题"
            extra="2020/01/01 12:00"
            content={
              <View style={{ height: px(42) }}>
                <Text style={{ marginLeft: px(16) }}>Card Content</Text>
                <Text style={{ marginLeft: px(16), color: Color.middleTextColor, paddingHorizontal: px(8) }}>
                  Card Content Card Content Card Content Card Content Card Content
                </Text>
              </View>
            }
            footer={
              <Flex style={{ paddingVertical: px(6) }}>
                <CustomTag>blue</CustomTag>
                <CustomTag type="green">green</CustomTag>
                <CustomTag type="yellow"> yellow</CustomTag>
              </Flex>
            }
          />

          <WhiteSpace style={{ backgroundColor: Color.grayBG }} />
          <CustomCard
            title="审批"
            extra="12分钟前"
            content={
              <View>
                <Text style={{ marginLeft: px(16) }}>公文审批:审批内容</Text>
              </View>
            }
            onOk={() => console.log('ok')}
            onCancle={() => console.log('cancle')}
          />
        </ChartWrap>
        <WhiteSpace style={{ backgroundColor: Color.grayBG }} />
        <Flex wrap="wrap" style={{ paddingHorizontal: px(4) }}>
          <ImgLinkItem title="标题" content="描述信息 描述信息" source={require('../../../../assets/pic_empty.png')} />
          <ImgLinkItem title="标题" content="描述信息 描述信息" source={require('../../../../assets/pic_empty.png')} />
          <ImgLinkItem title="标题" content="描述信息 描述信息" source={require('../../../../assets/pic_empty.png')} />
        </Flex>
        <WhiteSpace />
      </ScrollView>
    </Container>
  );
}
