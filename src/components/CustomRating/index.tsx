/*
 * @文件描述: 打分组件
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-01-15 09:48:50
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-26 18:35:16
 */
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { Size, Color } from '../../config';
import { IconOutline } from '@ant-design/icons-react-native';
import { Flex } from '@ant-design/react-native';

const { px } = Size;

interface CustomRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  onStart?: () => void;
  size?: number;
  showText?: boolean;
  readonly?: boolean;
  ratingCount?: number;
  /**是否允许清除星号 */
  allowClear?: boolean;
}
const CustomRating: React.FC<CustomRatingProps> = props => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(props.value || 0);
  }, [props.value]);

  const handleClear = () => {
    setRating(0);
    props.onChange && props.onChange(0);
  };

  const handleChange = (value: number) => {
    setRating(value);
    props.onChange && props.onChange(value);
  };

  return (
    <Flex align="center" justify="between">
      <AirbnbRating
        defaultRating={rating}
        count={props.ratingCount}
        showRating={false}
        onFinishRating={handleChange}
        isDisabled={props.readonly}
        starStyle={{ width: props.size, height: props.size }}
        // selectedColor={Color.primary}
      />
      <Flex>
        {props.showText && (
          <View style={{ width: px(30), paddingRight: px(10) }}>
            <Text style={{ textAlign: 'right' }}>{props.value}</Text>
          </View>
        )}
        {props.allowClear && !!rating && (
          <IconOutline name="close-circle" size={px(16)} color={Color.primary} onPress={handleClear} />
        )}
      </Flex>
    </Flex>
  );
};
CustomRating.defaultProps = {
  size: 20,
  ratingCount: 10,
  showText: false,
  allowClear: true
};

export default React.memo(CustomRating);
