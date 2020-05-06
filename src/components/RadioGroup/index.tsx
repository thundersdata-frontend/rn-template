import React, { useState, useEffect } from 'react';
import { SelectOption, valueType } from '../../interfaces/common';
import { Flex, List } from '@ant-design/react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Size, Color } from '../../config';
import ListItemText from '../ListItemText';

const { px } = Size;

interface RadioInter extends SelectOption {
  disabled?: boolean;
}

interface RadioGroupProps {
  data: RadioInter[];
  value?: valueType;
  onChange?: (value: valueType) => void;
  isOneLine?: boolean;
}

function Radio({
  label,
  checked,
  onChange,
  disabled = false
}: {
  label: string;
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={disabled ? undefined : onChange}
      style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
      <View style={[styles.radio, checked && !disabled && { borderColor: Color.primary }]}>
        {checked && <View style={[styles.checked, disabled && { backgroundColor: Color.grayBG }]} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
}

/** 同行radio */
export default function RadioGroup({ data, value, onChange, isOneLine = true }: RadioGroupProps) {
  const [currentValue, setCurrentValue] = useState<valueType>();

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleChange = (value: valueType) => {
    setCurrentValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  if (isOneLine) {
    return (
      <Flex style={{ flex: 1 }}>
        {data.map(item => (
          <Flex.Item key={item.value}>
            <Radio
              checked={item.value === currentValue}
              label={item.label}
              disabled={item.disabled}
              onChange={() => handleChange(item.value)}
            />
          </Flex.Item>
        ))}
      </Flex>
    );
  }

  return (
    <>
      {data.map(item => (
        <List.Item
          key={item.value}
          onPress={item.disabled ? undefined : () => handleChange(item.value)}
          disabled={item.disabled}
          extra={<Radio checked={item.value === currentValue} label="" />}>
          <ListItemText text={item.label} />
        </List.Item>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: px(18),
    height: px(18),
    borderRadius: px(18),
    borderWidth: Size.ONE_PIXEL,
    borderColor: Color.placeholderTextColor,
    marginRight: px(5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked: {
    backgroundColor: Color.primary,
    width: px(12),
    height: px(12),
    borderRadius: px(12)
  },
  radioText: {
    color: Color.helpTextColor,
    fontSize: px(14)
  }
});
