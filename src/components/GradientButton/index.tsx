import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Color } from '../../config';

export interface GradientButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
const GradientButton: React.FC<GradientButtonProps> = ({ text, style, onPress, disabled = false }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={disabled ? [Color.grayBG, Color.grayBG] : ['#434343', '#1C1A19']}
    style={[styles.button, style] as StyleProp<ViewStyle>}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  </LinearGradient>
);
export default GradientButton;

const styles = StyleSheet.create({
  button: {
    height: 44,
    lineHeight: 44,
    borderRadius: 4,
    justifyContent: 'center'
  },
  text: {
    color: Color.white,
    lineHeight: 22,
    fontSize: 16,
    alignSelf: 'center'
  }
});
