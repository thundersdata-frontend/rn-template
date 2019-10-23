import React from 'react';
import { View } from 'react-native';
import { Size } from '../../config';

export default function Separator() {
  return <View style={{ height: Size.px(10), backgroundColor: '#F0EFF5', flex: 1, justifyContent: 'center' }} />;
}
