/**
 * @功能描述: 渲染预警提醒Tip
 * @参数:totalNumber：预警消息个数
 * navigateTo : 跳转到的stack name
 * @返回值:
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import { Size } from '../../config';

const { px } = Size;

interface TodoTipProps {
  totalNumber: number; //预警数
  navigateTo: string; //跳转stackname
}

export default function TodoTip(props: TodoTipProps) {
  const navigation = useNavigation();
  const { totalNumber, navigateTo } = props;

  return (
    <View style={styles.warnWrap}>
      <TouchableOpacity style={styles.warn} onPress={() => navigation.navigate(navigateTo)}>
        <View style={styles.warningWrap}>
          <Icon name="bell" color="#F0412C" />
          <Text style={styles.warnContent}>{`有${totalNumber}条预警消息，请及时处理`}</Text>
        </View>
        <View style={styles.arrowSign}>
          <Text style={styles.arrowSignText}>
            <Icon name="right" color="#F0412C" />
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  warnWrap: {},
  title: {
    fontSize: px(16),
    fontWeight: '600',
    color: Colors.dark
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: px(14)
  },
  filterRight: {
    display: 'none',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: px(20)
  },
  navItem: {
    display: 'flex',
    width: '33.3%',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: px(20)
  },
  navText: {
    color: Colors.dark,
    fontSize: 14,
    marginTop: px(8)
  },
  textWrap: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  body: {
    backgroundColor: Colors.white
  },
  bg: {
    height: Size.px(100)
  },

  highlight: {
    fontWeight: '700'
  },
  footer: {
    color: Colors.dark,
    fontSize: px(12),
    fontWeight: '600',
    padding: px(4),
    paddingRight: px(12),
    textAlign: 'right'
  },
  warn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff5da',
    padding: px(10),
    borderRadius: 4,
    marginVertical: px(8),
    justifyContent: 'space-between'
  },
  warnContent: {
    color: '#F0412C',
    fontSize: px(14),
    marginLeft: px(10)
  },
  exclaSign: {
    borderRadius: 100,
    width: px(26),
    height: px(26),
    lineHeight: px(30),
    marginRight: px(10),
    borderColor: Colors.white,
    borderWidth: 2
  },
  exclaSignText: {
    color: Colors.white,
    fontSize: px(20),
    textAlign: 'center'
  },
  arrowSign: {
    marginTop: px(-4),
    marginLeft: px(10)
  },
  arrowSignText: {
    color: Colors.red,
    fontSize: px(22)
  },
  warningWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
