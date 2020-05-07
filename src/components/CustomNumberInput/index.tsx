/*
 * @文件描述: 自定义的数字输入组件
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-04-10 16:06:31
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-07 11:50:37
 */
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, Flex } from '@ant-design/react-native';
import Modal from 'react-native-modal';
import { Size, Color } from '../../config';
import { Text, StyleSheet, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import ListItemText from '../ListItemText';

const { px } = Size;
export interface CustomNumberInputProps {
  value?: string;
  onChange?: (value: string) => void;
  digit?: boolean;
  max?: number;
  text: string;
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  value = '',
  onChange,
  digit = true,
  max = 16,
  text
}) => {
  const insets = useSafeArea();
  const [val, setVal] = useState<string>('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!Number.isNaN(+value)) {
      setVal(value);
    }
  }, [value]);

  /**输入每个数字键 */
  // eslint-disable-next-line complexity
  const handlePress = (num: string) => {
    if (val.length >= max) return;

    if ((val === '' && num === '0') || (val.charAt(0) === '0' && num === '0' && !val.includes('.'))) {
      setVal(num);
    } else if (val.charAt(0) === '' && num === '.') {
      setVal('0.');
    } else {
      if ((val + num).split('').filter(ele => ele === '.').length <= 1) {
        setVal(val => val + num);
      }
    }
  };

  const handleClose = () => {
    handleClear();
    setVisible(false);
  };

  /**清除输入 */
  const handleClear = () => {
    setVal('');
    onChange && onChange('');
  };

  /**确认输入 */
  const handleConfirm = () => {
    setVisible(false);
    onChange && onChange(val);
  };

  return (
    <>
      <List.Item
        extra={
          <ListItemText style={{ color: val ? Color.mainTextColor : Color.helpTextColor }} text={val || '请输入'} />
        }
        onPress={() => setVisible(true)}>
        <ListItemText text={text} />
      </List.Item>
      <Modal
        style={{
          justifyContent: 'flex-end',
          margin: 0
        }}
        isVisible={visible}
        onBackButtonPress={handleClose}
        onBackdropPress={handleClose}>
        <View
          style={[
            styles.content,
            {
              paddingBottom: insets.bottom
            }
          ]}>
          <Flex justify="between" align="center" style={{ height: px(40) }}>
            <Text>输入数字：</Text>
            <Text style={[styles.number, { lineHeight: px(40) }]}>{val}</Text>
          </Flex>
          <Flex>
            <View style={{ flex: 2 }}>
              <Flex>
                <Flex.Item>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress('1')} style={styles.block}>
                    <Text style={styles.number}>1</Text>
                  </TouchableOpacity>
                </Flex.Item>
                <Flex.Item>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress('2')} style={styles.block}>
                    <Text style={styles.number}>2</Text>
                  </TouchableOpacity>
                </Flex.Item>
                <Flex.Item>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress('3')} style={styles.block}>
                    <Text style={styles.number}>3</Text>
                  </TouchableOpacity>
                </Flex.Item>
              </Flex>
              <Flex>
                <Flex.Item>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress('4')} style={styles.block}>
                    <Text style={styles.number}>4</Text>
                  </TouchableOpacity>
                </Flex.Item>
                <Flex.Item>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress('5')} style={styles.block}>
                    <Text style={styles.number}>5</Text>
                  </TouchableOpacity>
                </Flex.Item>
                <Flex.Item>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress('6')} style={styles.block}>
                    <Text style={styles.number}>6</Text>
                  </TouchableOpacity>
                </Flex.Item>
              </Flex>
              <Flex>
                <Flex.Item>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress('7')} style={styles.block}>
                    <Text style={styles.number}>7</Text>
                  </TouchableOpacity>
                </Flex.Item>
                <Flex.Item>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress('8')} style={styles.block}>
                    <Text style={styles.number}>8</Text>
                  </TouchableOpacity>
                </Flex.Item>
                <Flex.Item>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress('9')} style={styles.block}>
                    <Text style={styles.number}>9</Text>
                  </TouchableOpacity>
                </Flex.Item>
              </Flex>
              <Flex>
                <View style={{ flex: 2 }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress('0')} style={[styles.block]}>
                    <Text style={styles.number}>0</Text>
                  </TouchableOpacity>
                </View>
                {digit && (
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress('.')} style={styles.block}>
                      <Text style={styles.number}>.</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Flex>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleClear}
                style={[styles.block, { height: px(100), backgroundColor: Color.orange }]}>
                <Text style={styles.button}>清除</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleConfirm}
                style={[styles.block, { height: px(100), backgroundColor: Color.primary }]}>
                <Text style={styles.button}>确定</Text>
              </TouchableOpacity>
            </View>
          </Flex>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: px(10),
    width: Size.DEVICE_WIDTH,
    height: px(280)
  },
  block: {
    borderWidth: Size.ONE_PIXEL,
    borderColor: Color.borderColor,
    height: px(50),
    justifyContent: 'center',
    alignItems: 'center'
  },
  number: {
    fontSize: px(16),
    lineHeight: px(50),
    fontWeight: '500'
  },
  button: {
    fontSize: px(16),
    lineHeight: px(50),
    fontWeight: '500',
    color: Color.white
  }
});
export default React.memo(CustomNumberInput);
