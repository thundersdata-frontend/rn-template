/* tslint:disable */

/* eslint-disable */
import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';

import { helpers } from '@td-design/react-native';

import { getIconColor } from './helper';

const { px } = helpers;

export interface SvgIconProps extends GProps, ViewProps {
  size?: number;
  width?: number | string;
  height?: number | string;
  color?: string | string[];
}

let IconQq: FC<SvgIconProps> = ({ size, width = size, height = size, color, ...rest }) => {
  const xml = `
<svg width="18" height="21" viewBox="0 0 18 21"  xmlns="http://www.w3.org/2000/svg">
<path d="M17.6825 15.4182C17.4463 13.9505 17.004 12.523 16.3687 11.1776L15.4769 8.8924C15.6276 6.85858 15.2011 4.82353 14.2457 3.019C13.1998 1.229 11.3085 0.0926258 9.2286 0.00446403C8.67984 -0.0200231 5.23249 -0.0462594 3.53872 2.93067C2.52458 4.74592 2.09311 6.82625 2.30224 8.8924L1.3595 11.1968C1.3595 11.1968 0.919787 12.2463 0.538996 13.5248C0.158205 14.8034 -0.220827 16.814 0.154687 17.2189C0.530202 17.6238 1.91794 15.3482 2.04457 15.1436C2.09307 15.7082 2.21304 16.2644 2.40162 16.7991C2.7953 17.7379 3.38352 18.5835 4.12793 19.281C3.64073 19.4393 2.46758 19.86 2.29785 20.2929C2.08239 20.8482 2.46582 20.9051 3.12802 20.9462C4.90737 21.0354 6.69072 21.0062 8.46614 20.8587C8.48021 20.8543 8.49956 20.8543 8.51363 20.8491C8.66401 20.8535 8.80384 20.8587 8.93135 20.8587C9.01929 20.8587 9.11427 20.8587 9.22156 20.8543C9.23563 20.8543 9.24091 20.8587 9.25498 20.8587C11.0302 21.011 12.8138 21.0402 14.5931 20.9462C15.25 20.9086 15.6387 20.8438 15.4233 20.2929C15.2474 19.8495 14.0443 19.4253 13.5694 19.2767C13.7227 19.145 13.8669 19.0033 14.0012 18.8525C15.0418 17.8905 15.6347 16.5425 15.6387 15.1296C16.1431 15.9007 16.7295 16.6156 17.3879 17.2617C17.7107 17.3317 17.8039 17.0046 17.6816 15.4182H17.6825Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.19874 19.1333C4.45917 19.3879 4.74502 19.6099 5.05091 19.795C6.11209 20.4501 7.30692 20.8053 8.52644 20.8283C8.51896 20.8313 8.50995 20.8328 8.50107 20.8341C8.49348 20.8353 8.48598 20.8365 8.47958 20.8387C6.72764 20.9981 4.96786 21.0297 3.21205 20.9332C2.5586 20.8888 2.18024 20.8273 2.39285 20.2271C2.56033 19.7591 3.71798 19.3054 4.19874 19.1333ZM9.22155 20.8425C10.7904 20.8306 12.3069 20.2266 13.5128 19.1333V19.1352C13.9806 19.2959 15.1694 19.7544 15.3413 20.2356C15.5539 20.8311 15.1703 20.9011 14.5221 20.9417C12.7663 21.0435 11.0062 21.0119 9.25453 20.8472C9.24758 20.8472 9.24281 20.846 9.23804 20.8448C9.23327 20.8436 9.22849 20.8425 9.22155 20.8425Z" fill="${getIconColor(
    color,
    1,
    '#999999'
  )}"/>
<path d="M16.3332 11.0662L15.4458 8.8667C11.1517 9.96866 6.63215 9.96866 2.33805 8.8667L1.3999 11.0847C2.49473 11.4265 3.61735 11.6799 4.75605 11.842V14.8223C5.71086 14.9432 6.67639 14.9655 7.63613 14.8887V12.128C10.5787 12.3002 13.5288 11.94 16.3332 11.0662Z" fill="${getIconColor(
    color,
    2,
    '#999999'
  )}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.1586 3.02466C13.128 1.23063 11.2642 0.0923146 9.21507 0.00539253C8.67407 -0.0226773 5.2755 -0.04987 3.60482 2.93869C2.60408 4.75975 2.1781 6.84705 2.38411 8.92021C6.63503 10.0933 11.1189 10.0933 15.3698 8.92021C15.5218 6.87832 15.1011 4.83448 14.156 3.02378L14.1586 3.02466ZM7.15598 5.99656C6.52222 5.99656 6.01417 5.25271 6.01417 4.33605C6.01417 3.41939 6.52742 2.67466 7.15598 2.67466C7.78455 2.67466 8.2978 3.41851 8.2978 4.33517C8.2978 5.25183 7.78975 5.99656 7.15598 5.99656ZM9.42314 4.33605C9.42314 5.25271 9.9312 5.99656 10.565 5.99656H10.5684C11.1935 5.99656 11.7068 5.25183 11.7068 4.33517C11.7068 3.41851 11.1935 2.67466 10.565 2.67466C9.9364 2.67466 9.42314 3.41939 9.42314 4.33605Z" fill="${getIconColor(
    color,
    3,
    '#999999'
  )}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.48686 5.13328C7.21866 5.13328 7 4.81837 7 4.43328C7 4.04911 7.21866 3.73328 7.48686 3.73328C7.75506 3.73328 7.97373 4.04357 7.97373 4.43328C7.97373 4.82299 7.75506 5.13328 7.48686 5.13328ZM11.187 4.46283C11.2818 4.17932 10.8368 3.99462 10.5131 3.99462C10.1616 3.95938 9.82621 4.16159 9.66921 4.50346C9.59148 4.75742 9.81099 4.78051 9.95107 4.59581C10.1053 4.39311 10.3529 4.30316 10.5891 4.36402C10.6289 4.37124 10.6894 4.40153 10.757 4.43544C10.923 4.51863 11.1324 4.62357 11.187 4.46283Z" fill="${getIconColor(
    color,
    4,
    '#999999'
  )}"/>
<path d="M5.1333 7.4666C5.1333 7.76645 7.19484 8.8815 9.08047 8.86651C10.9661 8.85152 13.0666 7.74677 13.0666 7.42256C13.0666 7.09835 11.5545 6.53333 9.03974 6.53333C6.52499 6.53333 5.1333 7.02714 5.1333 7.4666H5.1333Z" fill="${getIconColor(
    color,
    5,
    '#999999'
  )}"/>
<path d="M17.6816 15.4894C17.4454 14.0048 17.0032 12.5609 16.3679 11.2C15.5627 11.4649 14.7438 11.6855 13.9147 11.8608C14.0445 12.7333 14.0869 13.6167 14.0413 14.4978C13.9859 16.7296 13.2622 18.5466 11.4852 19.5984C9.70816 20.6502 6.58404 20.4194 5.21938 18.7014C3.93386 17.0879 3.51707 15.884 3.82658 11.8501C2.99138 11.6934 2.16721 11.4821 1.35929 11.2176C1.35929 11.2176 0.919647 12.2792 0.538914 13.5725C0.158181 14.8658 -0.220794 16.8995 0.154664 17.31C0.530121 17.7204 1.91764 15.4178 2.04426 15.2108C2.09275 15.7819 2.2127 16.3445 2.40125 16.8853C2.90834 18.1821 3.81812 19.2795 4.99516 20.0142C6.1974 20.6907 7.55818 21.0298 8.93526 20.9961C10.8335 21.06 12.6718 20.3223 14.0053 18.9615C15.0451 17.988 15.6378 16.6248 15.6425 15.1957C16.1467 15.9758 16.7331 16.6988 17.3914 17.3524C17.7106 17.4241 17.8038 17.0932 17.6816 15.4894Z" fill="${getIconColor(
    color,
    6,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={width} height={height} {...rest} />;
};

IconQq.defaultProps = {
  size: px(16),
};

IconQq = React.memo ? React.memo(IconQq) : IconQq;

export default IconQq;
