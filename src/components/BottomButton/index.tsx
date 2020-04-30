import React from 'react';
import { View } from 'react-native';
import GradientButton from '../GradientButton';
import { Color, Size } from '../../config';

interface BottomButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

export default ({ onPress, text, disabled = false }: BottomButtonProps) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: Color.white,
        borderTopWidth: Size.ONE_PIXEL,
        borderTopColor: Color.borderColor
      }}>
      <GradientButton style={{ margin: Size.px(12) }} text={text} onPress={onPress} disabled={disabled} />
    </View>
  );
};
