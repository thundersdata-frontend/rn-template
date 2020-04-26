import React, { ReactNode } from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { Flex } from '@ant-design/react-native';
import { Size, Color } from '../../config';

export type CustomInputProps = Merge<
  TextInputProps,
  {
    onChange?: (value: string) => void;
    value?: string;
    extra?: string | ReactNode;
    readonly?: boolean;
  }
>;

const CustomInput: React.FC<CustomInputProps> = props => {
  const { onChange, value, extra, children, readonly = false, ...restProps } = props;

  return (
    <View
      style={{
        paddingLeft: 16
      }}>
      <Flex
        justify="between"
        align="center"
        style={{
          paddingRight: 16,
          paddingVertical: 8,
          borderBottomWidth: Size.ONE_PIXEL,
          borderBottomColor: Color.borderColor
        }}>
        <View>{children}</View>
        <Flex align="center">
          {readonly ? (
            <Text style={{ color: Color.middleTextColor, marginRight: 10 }}>{value}</Text>
          ) : (
            <TextInput
              value={value}
              onChangeText={onChange}
              {...restProps}
              style={{
                marginRight: Size.px(10),
                paddingLeft: Size.px(20),
                color: Color.middleTextColor,
                fontSize: Size.px(14)
              }}
            />
          )}
          {extra && <View>{typeof extra === 'string' ? <Text>{extra}</Text> : extra}</View>}
        </Flex>
      </Flex>
    </View>
  );
};

export default CustomInput;
