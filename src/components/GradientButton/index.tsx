import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../config';

export interface GradientButtonProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}
const GradientButton: React.FC<GradientButtonProps> = ({ text, style, onPress }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={['#0189FB', '#79BCFF']}
    style={[styles.button, style]}
  >
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  </LinearGradient>
);
export default GradientButton;

const styles = StyleSheet.create({
  button: {
    height: 42,
    lineHeight: 42,
    borderRadius: 4,
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    lineHeight: 22,
    fontSize: 16,
    alignSelf: 'center',
  },
});
