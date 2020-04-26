/*
 * @文件描述: 自定义的开关组件
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-10 15:09:39
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-16 16:28:27
 */
import React, { useState, useEffect } from 'react';
import { Switch, SwitchProps } from 'react-native-switch';
import { Color, Size } from '../../config';

type CustomSwitchProps = Omit<SwitchProps, 'onValueChange'> & { onChange?: (value: boolean) => void };

const CustomSwitch: React.FC<CustomSwitchProps> = props => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(props.value || false);
  }, [props.value]);

  const handleChange = (value: boolean) => {
    setChecked(value);
    props.onChange && props.onChange(value);
  };

  return (
    <Switch
      value={checked}
      onValueChange={handleChange}
      backgroundActive={props.backgroundActive}
      backgroundInactive={props.backgroundInactive}
      circleActiveColor={props.circleActiveColor}
      circleInActiveColor={props.circleInActiveColor}
      circleBorderWidth={props.circleBorderWidth}
      circleActiveBorderColor={props.circleActiveBorderColor}
      circleInactiveBorderColor={props.circleInactiveBorderColor}
      disabled={props.disabled}
    />
  );
};
CustomSwitch.defaultProps = {
  backgroundActive: Color.orange,
  backgroundInactive: Color.backgroundColor,
  circleActiveColor: Color.white,
  circleInActiveColor: Color.white,
  circleBorderWidth: Size.ONE_PIXEL,
  circleInactiveBorderColor: Color.borderColor,
  circleActiveBorderColor: Color.borderColor,
  disabled: false
};

export default React.memo(CustomSwitch);
