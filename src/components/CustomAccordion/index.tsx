/*
 * @文件描述: 样式改造后的通用手风琴组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-09-27 16:13:00
 * @LastEditors  : 陈杰
 * @LastEditTime : 2020-01-21 16:17:34
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Accordion } from '@ant-design/react-native';
import { Color, Size } from '../../config';
import { AccordionHeader } from '@ant-design/react-native/lib/accordion';

interface CustomAccordionProps<T> {
  sections: T[];
  activeSections?: number[];
  onChange?: (sections: number[]) => void;
  renderHeader?(content: T, index: number, isActive: boolean, sections: T[]): React.ReactElement<{}>;
  renderContent?(content: T, index: number, isActive: boolean, sections: T[]): React.ReactElement<{}>;
  renderSectionTitle?(content: T, index: number, isActive: boolean, sections: T[]): React.ReactElement<{}>;
}
function CustomAccordion<T extends AccordionHeader>(props: CustomAccordionProps<T>) {
  return <Accordion expandMultiple={true} sectionContainerStyle={styles.sectionContainer} {...props} />;
}

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: Color.white,
    borderBottomWidth: Size.ONE_PIXEL,
    borderBottomColor: Color.borderColor
  }
});

export default CustomAccordion;
