import React, { useState, useEffect } from 'react';
import { SelectOption, valueType } from '../../interfaces/common';
import { Flex } from '@ant-design/react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Size, Color } from '../../config';

const { px } = Size;

function Radio({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onChange}
      style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
      <View style={styles.radio}>{checked && <View style={styles.checked} />}</View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function RadioGroup({
  data,
  value,
  onChange
}: {
  data: SelectOption[];
  value?: valueType;
  onChange?: (value: valueType) => void;
}) {
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

  return (
    <Flex style={{ flex: 1 }}>
      {data.map(item => (
        <Flex.Item key={item.value}>
          <Radio checked={item.value === currentValue} label={item.label} onChange={() => handleChange(item.value)} />
        </Flex.Item>
      ))}
    </Flex>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: px(16),
    height: px(16),
    borderRadius: px(16),
    borderWidth: Size.ONE_PIXEL,
    borderColor: Color.grey,
    marginRight: px(5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked: {
    backgroundColor: Color.primary,
    width: px(12),
    height: px(12),
    borderRadius: px(12),
    borderWidth: Size.ONE_PIXEL,
    borderColor: Color.primary
  },
  radioText: {
    color: Color.helpTextColor,
    fontSize: px(14)
  }
});
