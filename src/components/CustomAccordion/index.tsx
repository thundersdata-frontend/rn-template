/*
 * @文件描述: 样式改造后的通用手风琴组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-09-27 16:13:00
 * @LastEditors: 廖军
 * @LastEditTime: 2019-10-16 10:11:00
 */
import React from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { Accordion, WingBlank, WhiteSpace } from '@ant-design/react-native';
import { Colors, Size } from '../../config';
import { AccordionHeader } from '@ant-design/react-native/lib/accordion';
import { AccordionProps } from 'react-native-collapsible/Accordion';
import Iconfont from '../Iconfont';

export type AccordionHeaderProps = Merge<
  AccordionHeader,
  {
    style?: StyleProp<ViewStyle>;
    icon: string;
  }
>;

export type CustomAccordionProps<T> = Merge<
  AccordionProps<T>,
  {
    renderHeader?(content: T, index: number, isActive: boolean, sections: T[]): React.ReactElement<{}>;
    renderContent?(content: T, index: number, isActive: boolean, sections: T[]): React.ReactElement<{}>;
  }
>;

const CustomAccordion: React.FC<CustomAccordionProps<AccordionHeaderProps>> = props => {
  const { activeSections, sections } = props;

  const renderContent = (section: AccordionHeaderProps) => <View style={styles.content}>{section.content}</View>;

  const renderHeader = (section: AccordionHeaderProps) => (
    <View style={styles.header}>
      <View style={styles.titleItem}>
        <Iconfont name={section.icon} size={Size.px(20)} color={Colors.primary} />
        <Text style={styles.title}>{section.title}</Text>
      </View>
      <Iconfont
        name={activeSections.includes(sections.findIndex(item => item.title === section.title)) ? 'up' : 'down'}
        size={Size.px(14)}
        color="#afafaf"
      />
    </View>
  );

  return (
    <WingBlank size="md">
      <Accordion
        expandMultiple={true}
        sectionContainerStyle={styles.sectionContainer}
        renderContent={renderContent}
        renderHeader={renderHeader}
        {...props}
        sections={sections.map(item => ({ ...item, style: {} }))}
        style={{ borderTopWidth: 0 }}
      />
      <WhiteSpace size="lg" />
    </WingBlank>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: Colors.white,
    borderColor: '#f2f2f2',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: Size.px(8),
  },
  content: {
    padding: Size.px(12),
    backgroundColor: Colors.white,
    borderTopWidth: Size.ONE_PIXEL,
    borderTopColor: Colors.borderColor,
  },
  header: {
    height: Size.px(44),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Size.px(12),
  },
  titleItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: Size.px(16),
    marginLeft: Size.px(8),
  },
});

export default CustomAccordion;
