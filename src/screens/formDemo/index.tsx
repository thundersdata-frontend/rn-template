import React, { useState } from 'react';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import Title from '../../components/Title';
import Container from '../../components/Container';
import CustomNumberInput from '../../components/CustomNumberInput';
import Form, { useForm, Field } from 'rc-field-form';
import CustomListItem from '../../components/CustomListItem';
import {
  InputItem,
  List,
  Icon,
  TextareaItem,
  WingBlank,
  WhiteSpace,
  Flex,
  Stepper,
  Button,
  Popover,
  ActionSheet,
  Modal
} from '@ant-design/react-native';
import { Color, Size } from '../../config';
import ListItemText from '../../components/ListItemText';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomSwitch from '../../components/CustomSwitch';
import RadioGroup from '../../components/RadioGroup';
import CustomAccordion from '../../components/CustomAccordion';
import { AccordionHeader } from '@ant-design/react-native/lib/accordion';
import Iconfont from '../../components/Iconfont';
import ListItem from '../../components/ListItem';
import CustomImagePicker from '../../components/CustomImagePicker';
import BottomButton from '../../components/BottomButton';
import { ValidateErrorEntity, InternalNamePath, Store } from 'rc-field-form/lib/interface';
import { toastFail, provinceList, toastSuccess } from '../../common';
import CustomListItemPicker from '../../components/CustomListItemPicker';
import MultiplePicker from '../../components/MultiplePicker';
import { valuesType } from '../../interfaces/common';
import SearchPicker from '../../components/SearchPicker';
import { isError, LABEL_NUMBER } from '../../utils/validation';
import { useNavigation } from '@react-navigation/native';
import { emailReg } from '../../utils/regex-utils';
import Input from '../../components/Input';

import data from '@bang88/china-city-data';

const { px } = Size;

const radioData = [
  { label: '男', value: 1, disabled: true },
  { label: '女', value: 2 }
];

const list = [
  { id: 1, name: '1班' },
  { id: 2, name: '2班' },
  { id: 3, name: '3班' }
];

const BUTTONS = ['操作A', '操作B', '操作C', '删除', '取消'];

export default () => {
  const [form] = useForm();
  const navigation = useNavigation();

  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [errorNames, setErrorNames] = useState<InternalNamePath>([]);
  const [pickerValue, setPickerValue] = useState<valuesType>(provinceList.map(item => item.province_name));
  const [pickerValue2, setPickerValue2] = useState<valuesType>([...provinceList.map(item => item.province_name)]);

  const handleFinish = (values: Store) => {
    setErrorNames([]);
    console.log(values, '-----');
  };

  const handleFinishFailed = ({ errorFields }: ValidateErrorEntity) => {
    setErrorNames(errorFields.map(item => item.name[0]));
    if (errorFields.length > 0) {
      toastFail(errorFields[0].errors[0]);
      return;
    }
  };

  const openActionSheet = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        title: '我是标题',
        message: '我是描述',
        options: BUTTONS,
        cancelButtonIndex: 4,
        destructiveButtonIndex: 3
      },
      buttonIndex => {
        toastSuccess(BUTTONS[buttonIndex]);
      }
    );
  };

  const showModal = () => {
    Modal.alert('标题', '我是填写说明', [{ text: '确定' }]);
  };

  const renderHeader = (_: AccordionHeader, __: number, isActive: boolean) => (
    <ListItem>
      <Flex justify="between">
        <ListItemText text="手风琴" />
        <Flex>
          <ListItemText text={selectedItems.length ? `已选择${selectedItems.length}项` : '请选择'} />
          <Icon
            name={isActive ? 'up' : 'down'}
            color={Color.helpTextColor}
            size={Size.px(16)}
            style={{ marginLeft: Size.px(5) }}
          />
        </Flex>
      </Flex>
    </ListItem>
  );

  const SECTIONS = [
    {
      title: '',
      style: {},
      content: (
        <View>
          {list.map(item => (
            <List.Item
              style={{ backgroundColor: Color.backgroundColor }}
              key={item.id}
              extra={
                <Iconfont
                  style={{ textAlign: 'right' }}
                  name="moduleSelected"
                  size={Size.px(16)}
                  color={selectedItems.includes(item.id) ? Color.primary : 'transparent'}
                />
              }
              onPress={() => {
                if (selectedItems.includes(item.id)) {
                  setSelectedItems(selectedItems.filter(i => i !== item.id));
                } else {
                  setSelectedItems([...selectedItems, item.id]);
                }
              }}>
              <ListItemText text={item.name} />
            </List.Item>
          ))}
        </View>
      )
    }
  ];

  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps="always">
        <WhiteSpace />
        <WingBlank>
          <TouchableOpacity onPress={() => navigation.navigate('SearchPage')}>
            <Flex
              justify="center"
              align="center"
              style={{
                height: px(30),
                backgroundColor: Color.backgroundColor,
                borderRadius: px(2)
              }}>
              <Icon name="search" color={Color.placeholderTextColor} />
              <Text style={{ color: Color.placeholderTextColor, fontSize: px(14) }}>搜索商品名称</Text>
            </Flex>
          </TouchableOpacity>
        </WingBlank>
        <WhiteSpace />
        <Title title="输入列表" />
        <Form component={false} form={form} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
          <List>
            <Field
              name="name"
              rules={[
                { required: true, message: '请输入用户名' },
                { len: 5, message: '请输入五个字' }
              ]}>
              <InputItem placeholder="请输入用户名" labelNumber={LABEL_NUMBER}>
                <ListItemText required={true} text="用户名" isError={isError(errorNames, 'name')} />
              </InputItem>
            </Field>
            <Field name="phoneNumber" rules={[{ required: true, message: '请输入联系电话' }]}>
              <InputItem
                labelNumber={LABEL_NUMBER}
                placeholder="请输入信息"
                extra={
                  <Text onPress={showModal} style={{ color: Color.primary }}>
                    填写说明
                  </Text>
                }>
                <ListItemText required text="联系电话" isError={isError(errorNames, 'phoneNumber')} />
              </InputItem>
            </Field>
            <Field name="weight">
              <CustomNumberInput text="身高（厘米）" />
            </Field>
            <Field name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <InputItem labelNumber={LABEL_NUMBER} clear placeholder="请输入" type="password">
                <ListItemText required text="登录密码" isError={isError(errorNames, 'password')} />
              </InputItem>
            </Field>
            <Field
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                {
                  pattern: emailReg,
                  message: '请正确填写邮箱'
                }
              ]}>
              <InputItem
                placeholder="请输入"
                labelNumber={LABEL_NUMBER}
                extra={
                  <Popover overlay={<Text>请填写自己的邮箱</Text>}>
                    <Icon name="info-circle" />
                  </Popover>
                }>
                <ListItemText required text="邮箱" isError={isError(errorNames, 'email')} />
              </InputItem>
            </Field>
            <Field name="account">
              <InputItem
                placeholderTextColor={Color.placeholderTextColor}
                styles={{
                  inputDisabled: {
                    backgroundColor: Color.white
                  }
                }}
                labelNumber={LABEL_NUMBER}
                placeholder="不可编辑"
                disabled>
                <ListItemText text="账号" style={{ color: Color.placeholderTextColor }} />
              </InputItem>
            </Field>
            <WingBlank>
              <Flex>
                <ListItemText text="数字区间" />
                <Field name="number1" trigger="onChangeText" validateTrigger="onChangeText">
                  <Input placeholder="请输入" style={{ width: px(80), marginLeft: px(20) }} />
                </Field>
                <Text> — </Text>
                <Field name="number2" trigger="onChangeText" validateTrigger="onChangeText">
                  <Input placeholder="请输入" style={{ width: px(80), marginLeft: px(20) }} />
                </Field>
              </Flex>
            </WingBlank>
            <Title title="多文本输入" />
            <WingBlank>
              <WhiteSpace />
              <ListItemText text="备注" />
            </WingBlank>
            <Field name="remark">
              <TextareaItem style={{ paddingHorizontal: px(12) }} rows={4} placeholder="请输入信息" />
            </Field>
            <Title title="选择列表" />
            <Field name="startTime">
              <CustomDatePicker title="开始日期" mode="date">
                <CustomListItem title="开始日期" extra="请选择" />
              </CustomDatePicker>
            </Field>
            <Field name="picker" rules={[{ required: true, message: '请选择picker' }]}>
              <CustomListItemPicker
                text="单选picker"
                title="单选picker"
                data={[
                  { label: '杭州', value: 1 },
                  { label: '上海', value: 2 }
                ]}
                isError={isError(errorNames, 'picker')}
                required={true}
              />
            </Field>
            <Field name="location">
              <CustomListItemPicker text="地区选择" title="地区选择" data={data} cols={3} />
            </Field>
            <Field>
              <CustomListItem
                title="多选picker"
                extra={
                  <MultiplePicker
                    data={provinceList.map(({ province_name }) => ({ label: province_name, value: province_name }))}
                    value={pickerValue}
                    onChange={setPickerValue}
                    centerText="省市"
                  />
                }
              />
            </Field>
            <Field>
              <CustomListItem
                title="搜索picker"
                extra={
                  <SearchPicker
                    data={provinceList.map(({ province_name }) => ({ label: province_name, value: province_name }))}
                    value={pickerValue2}
                    onChange={setPickerValue2}
                    centerText="省市"
                    placeholder="搜索省市名称"
                  />
                }
              />
            </Field>
            <Field>
              <CustomListItem title="标签内容" extra={<CustomSwitch value={true} />} />
            </Field>
            <Field>
              <CustomListItem title="switch未选中状态" extra={<CustomSwitch value={false} />} />
            </Field>
            <CustomListItem title="单行单选（男不可选）" extra={<RadioGroup value={1} data={radioData} />} />
            <RadioGroup isOneLine={false} data={radioData} />
            <CustomAccordion
              sections={SECTIONS}
              onChange={setActiveSections}
              activeSections={activeSections}
              renderHeader={renderHeader}
            />
            <Field name="stepper">
              <CustomListItem
                title="步进器"
                extra={
                  <Stepper
                    max={10}
                    min={1}
                    defaultValue={3}
                    inputStyle={{
                      height: 28,
                      lineHeight: 20
                    }}
                  />
                }
              />
            </Field>
            <CustomListItem title="动作面板" onPress={openActionSheet} />
            <Title title="图片上传" />
            <WhiteSpace />
            <CustomImagePicker />
            <WhiteSpace />
          </List>
          <ListItem>
            <Button type="primary">保存</Button>
            <WhiteSpace />
            <Button type="ghost">保存</Button>
            <WhiteSpace />
            <Flex justify="between">
              <Button type="ghost" style={{ width: Size.px(96) }}>
                保存
              </Button>
              <Button type="primary" style={{ width: Size.px(96) }}>
                保存
              </Button>
              <Button type="ghost" disabled style={{ width: Size.px(96) }}>
                不可操作
              </Button>
            </Flex>
          </ListItem>
        </Form>
      </ScrollView>
      <BottomButton text="保存" onPress={() => form.submit()} />
    </Container>
  );
};
