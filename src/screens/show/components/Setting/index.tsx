import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import Container from '../../../../components/Container';
import CustomItem from '../../../../components/CustomListItem';
import { THUMB_URL } from '../../../../common';
import { WhiteSpace } from '@ant-design/react-native';
import { Color } from '../../../../config';
import size from '../../../../config/size';
import color from '../../../../config/color';

export default function Setting() {
  return (
    <Container style={{ backgroundColor: Color.grayBG }}>
      <ScrollView>
        <CustomItem title="出生年月" extra="1972年04月03日" thumb={THUMB_URL} />
        <CustomItem title="籍贯" extra="浙江杭州" thumb={THUMB_URL} />
        <WhiteSpace />
        {/* <CustomItem title="修改密码" navigateTo="HomePage" /> */}
        <WhiteSpace />
        <TouchableOpacity
          onPress={() => {}}
          style={{ backgroundColor: Color.white, height: size.px(54), alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: size.px(16), color: color.fail }}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
}
