/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconMobile from './IconMobile';
import IconPassTab from './IconPassTab';
import IconPassword from './IconPassword';
import IconQq from './IconQq';
import IconSms from './IconSms';
import IconSmsTab from './IconSmsTab';
import IconUser from './IconUser';
import IconWarning from './IconWarning';
import IconWechat from './IconWechat';

export type IconNames = 'mobile' | 'passTab' | 'password' | 'qq' | 'sms' | 'smsTab' | 'user' | 'warning' | 'wechat';

export interface SvgIconProps extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  width?: number | string;
  height?: number | string;
  color?: string | string[];
}

let SvgIcon: FC<SvgIconProps> = ({ name, ...rest }) => {
  switch (name) {
    case 'mobile':
      return <IconMobile {...rest} />;
    case 'passTab':
      return <IconPassTab {...rest} />;
    case 'password':
      return <IconPassword {...rest} />;
    case 'qq':
      return <IconQq {...rest} />;
    case 'sms':
      return <IconSms {...rest} />;
    case 'smsTab':
      return <IconSmsTab {...rest} />;
    case 'user':
      return <IconUser {...rest} />;
    case 'warning':
      return <IconWarning {...rest} />;
    case 'wechat':
      return <IconWechat {...rest} />;

    default:
      return null;
  }
};

SvgIcon = React.memo ? React.memo(SvgIcon) : SvgIcon;

export default SvgIcon;
