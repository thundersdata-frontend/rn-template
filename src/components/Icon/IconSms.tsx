/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgCss } from 'react-native-svg';
import { getIconColor } from './helper';

import { helpers } from '@td-design/react-native';

const { px } = helpers;

export interface SvgIconProps extends GProps, ViewProps {
  size?: number;
  width?: number | string;
  height?: number | string;
  color?: string | string[];
}

let IconSms: FC<SvgIconProps> = ({ size, width = size, height = size, color, ...rest }) => {
  const xml = `
<svg t="1626858718730" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5644" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css">@font-face { font-family: feedback-iconfont; src: url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff2") format("woff2"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.woff") format("woff"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.ttf") format("truetype"), url("//at.alicdn.com/t/font_1031158_1uhr8ri0pk5.svg#iconfont") format("svg"); }
</style></defs><path d="M891.306667 279.04c-2.133333-37.546667-29.44-68.693333-66.133334-75.946667-47.786667-7.253333-95.146667-18.346667-141.653333-32-44.8-17.92-86.613333-41.813333-124.586667-71.253333-30.72-20.48-71.68-18.773333-100.693333 4.693333-35.84 31.146667-78.08 54.613333-123.733333 67.84-43.52 17.92-89.173333 29.44-136.106667 33.706667-37.546667 4.693333-66.133333 35.84-67.84 73.813333v238.506667c3.413333 208.64 247.893333 420.693333 383.146667 420.693333 132.693333 0 342.613333-147.626667 374.613333-416.426666 5.546667-81.493333 6.4-162.56 2.986667-243.626667z m-70.4 236.8c-29.013333 235.946667-212.053333 354.56-306.773334 354.56-40.533333 0-119.893333-38.4-192.853333-111.786667-76.373333-76.8-120.746667-164.693333-122.453333-241.066666V281.6c0.426667-4.266667 3.84-7.68 7.68-8.106667 51.626667-5.12 102.4-17.493333 150.613333-37.12 52.906667-16.213333 102.826667-43.52 144.213333-79.786666 3.413333-2.56 7.253333-3.413333 9.813334-3.413334 2.133333 0 5.12 0.426667 8.106666 2.133334 42.24 32.426667 88.746667 58.88 138.24 78.506666l2.986667 1.28 2.986667 0.853334c48.64 14.506667 98.56 26.026667 148.906666 34.133333 5.973333 1.28 9.813333 6.4 10.666667 12.373333 3.413333 77.653333 2.56 156.16-2.133333 233.386667z" fill="${getIconColor(
    color,
    0,
    '#999999',
  )}" p-id="5645"></path><path d="M493.653333 637.866667c-13.226667 13.226667-34.986667 13.226667-48.213333 0l-120.746667-120.746667c-13.226667-13.226667-13.226667-34.986667 0-48.213333 13.226667-13.226667 34.986667-13.226667 48.213334 0l120.746666 120.746666c13.226667 13.226667 13.226667 34.986667 0 48.213334z" fill="${getIconColor(
    color,
    1,
    '#999999',
  )}" p-id="5646"></path><path d="M699.733333 432.213333l-206.506666 206.506667c-12.8 12.8-33.706667 12.8-46.933334 0-12.8-12.8-12.8-33.706667 0-46.933333L652.8 385.28c12.8-12.8 33.706667-12.8 46.933333 0 12.8 12.8 12.8 33.706667 0 46.933333z" fill="${getIconColor(
    color,
    2,
    '#999999',
  )}" p-id="5647"></path></svg>
`;

  return <SvgCss xml={xml} width={width} height={height} {...rest} />;
};

IconSms.defaultProps = {
  size: px(16),
};

IconSms = React.memo ? React.memo(IconSms) : IconSms;

export default IconSms;
