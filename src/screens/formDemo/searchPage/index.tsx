import React from 'react';
import Container from '../../../components/Container';
import { SearchBar, WingBlank, WhiteSpace, Flex } from '@ant-design/react-native';
import { Color, Size } from '../../../config';
import { View, Text, StyleSheet } from 'react-native';

const { px } = Size;

const SearchPage = () => {
  return (
    <Container>
      <SearchBar autoFocus />
      <WhiteSpace />
      <WingBlank>
        <View style={{ borderTopColor: Color.borderColor, borderTopWidth: Size.ONE_PIXEL }}>
          <Text
            style={{
              color: Color.middleTextColor,
              fontSize: px(14),
              fontWeight: '400'
            }}>
            历史记录
          </Text>
          <WhiteSpace />
          <Flex wrap="wrap">
            <Text style={styles.tag}>标签1</Text>
            <Text style={styles.tag}>标签2</Text>
            <Text style={styles.tag}>标签标签标签啊</Text>
            <Text style={styles.tag}>标签</Text>
          </Flex>
        </View>
      </WingBlank>
    </Container>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Color.backgroundColor,
    paddingHorizontal: px(8),
    color: Color.middleTextColor,
    fontSize: px(12),
    lineHeight: px(24),
    textAlign: 'center',
    marginRight: px(4),
    marginBottom: px(8)
  }
});

export default SearchPage;
