import { useEffect } from 'react';
import { ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { KeyboardInsetsView } from '@sdcx/keyboard-insets';
import {
  Box,
  Button,
  Checkbox,
  Form,
  helpers,
  Input,
  Modal,
  NumberKeyboard,
  Radio,
  Stepper,
  type Store,
  Switch,
  Text,
  type ValidateErrorEntity,
  WhiteSpace,
  WingBlank,
} from '@td-design/react-native';
import ImagePicker from '@td-design/react-native-image-picker';
import { DatePickerItem, PickerItem } from '@td-design/react-native-picker';
import { useSafeState } from '@td-design/rn-hooks';
import { type FieldData } from 'rc-field-form/es/interface';

import { Container } from '@/components/Container';

const { FormItem, FormListItem, useForm } = Form;
const { InputItem, TextArea } = Input;
const { NumberKeyboardItem } = NumberKeyboard;
const { px, ONE_PIXEL } = helpers;
const residences = [
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          {
            value: 'xihu',
            label: '西湖区',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
        children: [
          {
            value: 'zhonghuamen',
            label: '中华门区',
          },
        ],
      },
    ],
  },
];

export function LongForm() {
  const [form] = useForm();
  const navigation = useNavigation();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useSafeState(false);

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (!hasUnsavedChanges) return;

      e.preventDefault();

      Modal.confirm({
        title: '放弃编辑',
        content: '您还有尚未保存的修改，确定放弃编辑吗？',
        okText: '确定',
        cancelText: '继续编辑',
        onOk() {
          navigation.dispatch(e.data.action);
        },
      });
    });
  }, [hasUnsavedChanges]);

  const handleFieldsChange = (changedFields: FieldData[]) => {
    setHasUnsavedChanges(changedFields.length > 0);
  };

  const handleFinish = (values: Store) => {
    console.log(values);
    // 提交成功后将标志位复位
    setHasUnsavedChanges(false);
  };

  const handleFinishFailed = (errorInfo: ValidateErrorEntity<Store>) => {
    console.error(errorInfo);
  };

  return (
    <Container>
      <KeyboardInsetsView style={{ flex: 1 }} extraHeight={8}>
        <ScrollView
          contentInsetAdjustmentBehavior="always"
          overScrollMode="always"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
          <WingBlank>
            <Form
              form={form}
              onFieldsChange={handleFieldsChange}
              onFinish={handleFinish}
              onFinishFailed={handleFinishFailed}
            >
              <FormItem name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                <InputItem required label="姓名" placeholder="请输入姓名" inputStyle={{ textAlign: 'right' }} />
              </FormItem>
              <FormItem name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
                <InputItem
                  keyboardType="email-address"
                  required
                  label="邮箱"
                  placeholder="请输入邮箱"
                  inputStyle={{ textAlign: 'right' }}
                />
              </FormItem>
              <FormListItem title="性别" name="gender" required rules={[{ required: true, message: '请选择性别' }]}>
                <Radio
                  options={[
                    { label: '男', value: '1' },
                    { label: '女', value: '0' },
                    { label: '保密', value: '-' },
                  ]}
                />
              </FormListItem>
              <FormListItem title="年龄" name="age" required rules={[{ required: true, message: '请选择年龄' }]}>
                <Stepper min={0} />
              </FormListItem>
              <FormListItem
                title="身份证号"
                name="idcard"
                required
                rules={[{ required: true, message: '请输入身份证号' }]}
              >
                <NumberKeyboardItem type="idcard" placeholder="请输入身份证号" inputStyle={{ textAlign: 'right' }} />
              </FormListItem>
              <FormListItem title="爱好" name="favorites" required rules={[{ required: true, message: '请选择爱好' }]}>
                <Checkbox
                  showCheckAll={false}
                  options={[
                    { label: '钓鱼', value: '1' },
                    { label: '看书', value: '0' },
                    { label: '跑步', value: '3' },
                  ]}
                />
              </FormListItem>
              <FormListItem
                title="出生地"
                name="residences"
                required
                rules={[{ required: true, message: '请选择出生地' }]}
              >
                <PickerItem cascade data={residences} style={{ height: px(32) }} />
              </FormListItem>
              <FormListItem
                title="出生日期"
                name="birthday"
                required
                rules={[{ required: true, message: '请选择出生日期' }]}
              >
                <DatePickerItem style={{ height: px(32) }} />
              </FormListItem>
              <FormListItem title="公开个人资料" name="public" valuePropName="checked">
                <Switch />
              </FormListItem>
              <FormListItem name="avatar" title="个人头像">
                <ImagePicker onGrantFail={() => console.log('111')}>
                  <Box
                    width="100%"
                    flex={1}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderWidth={ONE_PIXEL}
                    borderColor="border"
                  >
                    <Text>上传照片</Text>
                  </Box>
                </ImagePicker>
              </FormListItem>
              <FormItem name="info">
                <TextArea label="个人简介" placeholder="请输入姓名" />
              </FormItem>
              <FormItem name="website" rules={[{ required: true, message: '请输入个人网站' }]}>
                <InputItem
                  returnKeyType="done"
                  keyboardType="url"
                  required
                  label="个人网站"
                  placeholder="请输入个人网站"
                  inputStyle={{ textAlign: 'right' }}
                />
              </FormItem>
            </Form>
            <WhiteSpace />
            <Button title="提交" onPress={form.submit} />
          </WingBlank>
        </ScrollView>
      </KeyboardInsetsView>
    </Container>
  );
}
