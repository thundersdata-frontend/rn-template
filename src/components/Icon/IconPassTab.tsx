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

let IconPassTab: FC<SvgIconProps> = ({ size, width = size, height = size, color, ...rest }) => {
  const xml = `
<svg width="346" height="50" viewBox="0 0 346 50"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 25C0 13.9543 8.9543 5 20 5H326C337.046 5 346 13.9543 346 25V48.3905V49.3643H0V49.1223V25Z" fill="${getIconColor(
    color,
    0,
    '#999999',
  )}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M346 20C346 8.95429 337.046 0 326 0H189.072C181.715 0 175.019 4.24693 171.884 10.902L159.207 37.8086C156.072 44.4637 149.376 48.7106 142.019 48.7106H0V49.3643H346V20Z" fill="${getIconColor(
    color,
    1,
    '#999999',
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={width} height={height} {...rest} />;
};

IconPassTab.defaultProps = {
  size: px(16),
};

IconPassTab = React.memo ? React.memo(IconPassTab) : IconPassTab;

export default IconPassTab;
