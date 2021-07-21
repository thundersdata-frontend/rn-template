/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconMobile from './IconMobile';
import IconPassword from './IconPassword';
import IconSms from './IconSms';
import IconUser from './IconUser';
import IconWarning from './IconWarning';

export type IconNames = 'mobile' | 'password' | 'sms' | 'user' | 'warning';

export interface IconfontProps extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FC<IconfontProps> = ({ name, ...rest }) => {
  switch (name) {
    case 'mobile':
      return <IconMobile key="L1" {...rest} />;
    case 'password':
      return <IconPassword key="L2" {...rest} />;
    case 'sms':
      return <IconSms key="L3" {...rest} />;
    case 'user':
      return <IconUser key="L4" {...rest} />;
    case 'warning':
      return <IconWarning key="L5" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
