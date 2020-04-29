/*
 * @文件描述: tab切换组件，形式为button
 * @公司: thundersdata
 * @作者: 黄姗姗
 * @LastEditors: 黄姗姗
 * @Date: 2020-01-07 15:35:12
 * @LastEditTime: 2020-04-29 10:55:15
 */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ViewStyle, TouchableOpacity } from 'react-native';
import { Color, Size } from '../../config';

interface TabButtonProps {
  tabs: { title: string }[];
  key?: string;
  style?: ViewStyle;
}
const { px } = Size;
const TabButton: React.FC<TabButtonProps> = ({ key, tabs, style, children }) => {
  const [activeKey, setActiveKey] = useState<string>(tabs[0].title);

  const onChange = (title: string) => {
    setActiveKey(title);
  };

  useEffect(() => {
    key && setActiveKey(key);
  }, [key]);

  return (
    <>
      <View style={[styles.nav, style]}>
        <View style={styles.wrap}>
          {tabs.map(item => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={item.title}
              style={activeKey === item.title ? [styles.item, styles.active] : styles.item}
              onPress={() => onChange(item.title)}>
              <Text
                style={[
                  styles.text,
                  activeKey === item.title ? { color: Color.mainTextColor } : { color: Color.helpTextColor }
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.content}>
        {React.Children.map(children, (child, index) => {
          return <View style={activeKey === tabs[index].title ? styles.tab : styles.none}>{child}</View>;
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  nav: {
    backgroundColor: Color.white,
    paddingVertical: px(12),
    paddingHorizontal: px(16)
  },
  wrap: {
    height: px(32),
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: px(4),
    borderWidth: Size.ONE_PIXEL,
    borderColor: Color.borderColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: px(3)
  },
  item: {
    flex: 1,
    height: px(28)
  },
  text: {
    fontSize: px(12),
    lineHeight: px(28),
    textAlign: 'center'
  },
  active: {
    backgroundColor: Color.white,
    color: Color.mainTextColor,
    borderRadius: px(4)
  },
  content: {
    backgroundColor: Color.white,
    flex: 1
  },
  tab: {
    backgroundColor: Color.white,
    width: '100%',
    height: '100%'
  },
  none: {
    display: 'none'
  }
});

export default TabButton;
