/*
 * @文件描述:详情列表项组件
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2019-09-30 16:03:21
 * @LastEditors: 阮旭松
 * @LastEditTime: 2019-10-14 16:00:58
 */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationScreenProp, NavigationLeafRoute } from 'react-navigation';
import { Colors, Size } from '../../config';
import Iconfont from '../Iconfont';

interface DetailListProps {
  /** 列表项左边名称 */
  label?: string;
  /** 列表项右边内容 */
  value?: string | React.ReactElement;
  /** 布局左右或上下('vertical'|'horizontal'|'left') */
  layout?: 'vertical' | 'horizontal' | 'left';
  /** 是否为列表中最后一个(没有下划线) */
  last?: boolean;
  /** 是否有右箭头 */
  rightArrow?: boolean;
  /** 路由地址(string),有router时使用按钮模式，有下面属性: */
  router?: string;
  /** 前面的icon图标名 */
  icon?: string;
  /** iconfont的颜色 */
  iconColor?: string;
  navigation: NavigationScreenProp<NavigationLeafRoute>;
}

const DetailItem = (props: DetailListProps) => {
  const {
    label = '',
    value = '',
    layout = 'horizontal',
    last,
    icon,
    iconColor,
    rightArrow,
    router = '',
    navigation,
  } = props;
  const layoutStyles = styles[`${layout}Item`];
  const lastStyles = styles[last ? 'lastItem' : 'normalItem'];
  const containerStyles = styles[layout === 'vertical' ? 'verticalText' : ''];
  const labelStyles = [styles.labelText, layout === 'left' ? styles.leftLabel : {}];

  /**
   * @功能描述: 渲染右边内容
   * @参数:
   * @返回值:
   */
  const renderContent = () => {
    // 若右边内容为箭头
    if (rightArrow) {
      return <Iconfont name="next" size={Size.px(12)} color={Colors.labelColor} />;
    }
    // 若右边内容为字符串
    if (typeof value === 'string') {
      return <Text style={[containerStyles, { color: Colors.labelColor }]}>{value}</Text>;
    }
    return value;
  };

  return router ? (
    /** 按钮模式 */
    <TouchableOpacity onPress={() => navigation.navigate(router)} style={[layoutStyles, lastStyles]}>
      <View style={styles.labelWrap}>
        {icon && <Iconfont name={icon} style={styles.iconStyle} size={Size.px(16)} color={iconColor} />}
        <Text style={labelStyles}>{label}</Text>
      </View>
      <View>{renderContent()}</View>
    </TouchableOpacity>
  ) : (
    /** 文本模式 */
    <View style={[layoutStyles, lastStyles]}>
      <View>
        <Text style={labelStyles}>{label}</Text>
      </View>
      <View>{renderContent()}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  verticalItem: {
    display: 'flex',
    marginTop: Size.px(12),
    justifyContent: 'space-between',
    marginBottom: Size.px(20),
  },
  horizontalItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Size.px(44),
    lineHeight: Size.px(44),
  },
  leftItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: Size.px(44),
    lineHeight: Size.px(44),
  },
  lastItem: {
    paddingLeft: Size.px(14),
    paddingRight: Size.px(14),
  },
  normalItem: {
    borderBottomColor: '#f7f7f7',
    borderBottomWidth: 1,
    paddingLeft: Size.px(14),
    paddingRight: Size.px(14),
  },
  verticalText: {
    marginTop: Size.px(8),
  },
  labelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconStyle: {
    marginRight: Size.px(10),
  },
  labelText: {
    fontSize: Size.px(14),
    color: Colors.black,
  },
  leftLabel: {
    width: Size.px(60),
  },
});

export default withNavigation(DetailItem);
