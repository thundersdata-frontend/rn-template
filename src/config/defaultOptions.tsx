import React from 'react';
import Colors from './colors';
import Size from './size';
import { StatusBar, View } from 'react-native';
import { isIOS } from './size';

export default {
  headerStyle: {
    backgroundColor: Colors.headerColor,
    elevation: 0,
    paddingTop: isIOS() ? 0 : StatusBar.currentHeight,
    borderBottomWidth: 0,
    height: isIOS() ? Size.px(36) : Size.px(74),
  },
  headerTitleStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
    color: Colors.black,
    fontWeight: 'normal',
  },
  headerRight: <View />,
};
