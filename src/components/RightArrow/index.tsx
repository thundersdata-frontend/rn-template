import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Color, Size } from '../../config';

const RightArrow = () => {
  return <Icon name="right" color={Color.helpTextColor} size={Size.px(16)} style={{ marginLeft: Size.px(5) }} />;
};

export default RightArrow;
