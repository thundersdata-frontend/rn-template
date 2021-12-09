/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';
import { getIconColor } from './helper';

import { helpers } from '@td-design/react-native';

const { px } = helpers;

export interface SvgIconProps extends GProps, ViewProps {
  size?: number;
  width?: number | string;
  height?: number | string;
  color?: string | string[];
}

let IconSmsTab: FC<SvgIconProps> = ({ size, width = size, height = size, color, ...rest }) => {
  const xml = `
<svg width="346" height="50" viewBox="0 0 346 50"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M346 25C346 13.9543 337.046 5 326 5H20C8.95428 5 0 13.9543 0 25V48.3905V49.3643H346V49.1223V25Z" fill="${getIconColor(
    color,
    0,
    '#999999',
  )}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 20C0 8.95429 8.9543 0 20 0H156.928C164.285 0 170.981 4.24693 174.116 10.902L186.793 37.8086C189.928 44.4637 196.624 48.7106 203.981 48.7106H346V49.3643H0V20Z" fill="${getIconColor(
    color,
    1,
    '#999999',
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={width} height={height} {...rest} />;
};

IconSmsTab.defaultProps = {
  size: px(16),
};

IconSmsTab = React.memo ? React.memo(IconSmsTab) : IconSmsTab;

export default IconSmsTab;
