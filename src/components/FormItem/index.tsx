/*
 * @文件描述: form组件的封装
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-10-25 16:54:00
 * @LastEditors: 廖军
 * @LastEditTime: 2019-10-25 17:51:00
 */
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../config';
import ShowError from '../ShowError';
import { Form, ValidationRule } from '../../interfaces/form';

export interface FormItemProps {
  style?: ViewStyle;
  form: Form;
  name: string;
  rules: ValidationRule[];
  validateFirst?: boolean;
}

export const FormItem: React.FC<FormItemProps> = props => {
  const { style, form, name, rules, validateFirst } = props;
  const { getFieldDecorator, getFieldError } = form;
  const errors = getFieldError(name);

  const childrenWithProps = React.cloneElement(props.children as React.ReactElement, {
    style: errors && errors.length > 0 ? styles.error : styles.normal,
  });

  return (
    <View style={[style]}>
      <ShowError error={errors}>
        {getFieldDecorator(name, {
          validateFirst,
          rules,
        })(childrenWithProps)}
      </ShowError>
    </View>
  );
};

FormItem.defaultProps = {
  validateFirst: true,
};

const styles = StyleSheet.create({
  error: {
    borderColor: 'red',
  },
  normal: {
    borderColor: Colors.borderColor,
  },
});

export default FormItem;
