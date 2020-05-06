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
  ActionSheet
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
import { ValidateErrorEntity, InternalNamePath } from 'rc-field-form/lib/interface';
import { toastFail, toastSuccess } from '../../common';
import { isError } from '../../utils/validation';
import CustomListItemPicker from '../../components/CustomListItemPicker';
import { useNavigation } from '@react-navigation/native';

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

  const handleFinish = () => {
    setErrorNames([]);
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

  const renderHeader = (_: AccordionHeader, __: number, isActive: boolean) => (
    <ListItem>
      <Flex justify="between">
        <ListItemText text="标签内容" />
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
              <InputItem placeholder="请输入用户名">
                <ListItemText required={true} text="用户名" isError={isError(errorNames, 'name')} />
              </InputItem>
            </Field>
            <Field name="phoneNumber" rules={[{ required: true, message: '请输入联系电话' }]}>
              <InputItem placeholder="请输入信息" extra={<Text style={{ color: Color.primary }}>填写说明</Text>}>
                <ListItemText required text="联系电话" isError={isError(errorNames, 'phoneNumber')} />
              </InputItem>
            </Field>
            <Field name="weight">
              <CustomNumberInput text="身高（厘米）" />
            </Field>
            <Field name="password">
              <InputItem clear placeholder="请输入" type="password">
                <ListItemText text="登录密码" />
              </InputItem>
            </Field>
            <Field
              name="email"
              rules={[
                {
                  pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
                  message: '请正确填写邮箱'
                }
              ]}>
              <InputItem
                placeholder="请输入"
                extra={
                  <Popover overlay={<Text>邮箱校验规则</Text>}>
                    <Icon name="info-circle" />
                  </Popover>
                }>
                <ListItemText text="邮箱" isError={isError(errorNames, 'email')} />
              </InputItem>
            </Field>
            {/* TODO: 会换行，待解决 */}
            <CustomListItem
              title="数字区间"
              extra={
                <Flex>
                  <View style={{ width: px(60) }}>
                    <InputItem />
                  </View>
                  <Text>-</Text>
                  <View style={{ width: px(60) }}>
                    <InputItem />
                  </View>
                </Flex>
              }
            />
            <Field name="account">
              <InputItem placeholder="不可编辑" disabled>
                <ListItemText text="账号" />
              </InputItem>
            </Field>
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
                text="标签内容"
                title="标签内容"
                data={[
                  { label: '杭州', value: 1 },
                  { label: '上海', value: 2 }
                ]}
                isError={isError(errorNames, 'picker')}
                required={true}
              />
            </Field>
            <Field>
              <CustomListItem title="标签内容" extra={<CustomSwitch value={true} />} />
            </Field>
            <Field>
              <CustomListItem title="标签内容" extra={<CustomSwitch value={false} />} />
            </Field>
            <CustomListItem title="单行单选" extra={<RadioGroup value={1} data={radioData} />} />
            <RadioGroup isOneLine={false} data={radioData} />
            <CustomAccordion
              sections={SECTIONS}
              onChange={setActiveSections}
              activeSections={activeSections}
              renderHeader={renderHeader}
            />
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
            <CustomListItem title="动作面板" onPress={openActionSheet} />
            <Title title="图片上传" />
            <WhiteSpace />
            <CustomImagePicker />
            <WhiteSpace />
          </List>
          <WhiteSpace />
          <WingBlank>
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
          </WingBlank>
          <WhiteSpace />
        </Form>
      </ScrollView>
      <BottomButton text="保存" onPress={() => form.submit()} />
    </Container>
  );
};
