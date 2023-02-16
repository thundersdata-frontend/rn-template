import { Container } from '@/components';
import {
  Box,
  Button,
  Checkbox,
  Form,
  helpers,
  Input,
  NumberKeyboard,
  Radio,
  Stepper,
  Switch,
  Text,
  WhiteSpace,
  WingBlank,
} from '@td-design/react-native';
import type { Store, ValidateErrorEntity } from '@td-design/react-native';
import ImagePicker from '@td-design/react-native-image-picker';
import { DatePickerItem, PickerItem } from '@td-design/react-native-picker';
import { ScrollView } from 'react-native';
import { AvoidSoftInputView } from 'react-native-avoid-softinput';

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

  const handleFinish = (values: Store) => {
    console.log(values);
  };

  const handleFinishFailed = (errorInfo: ValidateErrorEntity<Store>) => {
    console.error(errorInfo);
  };

  return (
    <Container>
      <AvoidSoftInputView easing="easeIn" hideAnimationDuration={100} showAnimationDuration={100}>
        <ScrollView
          contentInsetAdjustmentBehavior="always"
          overScrollMode="always"
          showsVerticalScrollIndicator={false}
        >
          <WingBlank>
            <Form form={form} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
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
                <NumberKeyboardItem type="IdCard" placeholder="请输入身份证号" inputStyle={{ textAlign: 'right' }} />
              </FormListItem>
              <FormListItem
                title="爱好"
                name="favorites"
                minHeight={px(32)}
                required
                rules={[{ required: true, message: '请选择爱好' }]}
              >
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
      </AvoidSoftInputView>
    </Container>
  );
}