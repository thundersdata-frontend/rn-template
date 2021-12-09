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

let IconMobile: FC<SvgIconProps> = ({ size, width = size, height = size, color, ...rest }) => {
  const xml = `
<svg width="16" height="16" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
<g id="&#230;&#137;&#139;&#230;&#156;&#186;">
<path id="&#229;&#189;&#162;&#231;&#138;&#182;" fill-rule="evenodd" clip-rule="evenodd" d="M12.35 1H4.65C3.7425 1 3 1.756 3 2.68V13.32C3 14.244 3.7425 15 4.65 15H12.35C13.2575 15 14 14.244 14 13.32V2.68C14 1.756 13.2575 1 12.35 1ZM4.65 2.12H12.35C12.6473 2.12 12.9 2.37725 12.9 2.68V10.52H4.1V2.68C4.1 2.37725 4.35266 2.12 4.65 2.12ZM4.65 13.88H12.35C12.6473 13.88 12.9 13.6228 12.9 13.32V11.64H4.1V13.32C4.1 13.6228 4.35266 13.88 4.65 13.88Z" fill="${getIconColor(
    color,
    0,
    '#999999',
  )}"/>
<path id="&#232;&#183;&#175;&#229;&#190;&#132;" d="M9.25 12H7.75C7.33516 12 7 12.2234 7 12.5C7 12.7766 7.33516 13 7.75 13H9.25C9.66484 13 10 12.7766 10 12.5C10 12.2234 9.66484 12 9.25 12Z" fill="${getIconColor(
    color,
    1,
    '#999999',
  )}"/>
</g>
</svg>
`;

  return <SvgXml xml={xml} width={width} height={height} {...rest} />;
};

IconMobile.defaultProps = {
  size: px(16),
};

IconMobile = React.memo ? React.memo(IconMobile) : IconMobile;

export default IconMobile;
