import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color, Size } from '../../../../config';
import Iconfont from '../../../../components/Iconfont';
import Input from '../../../../components/Input';
import GradientButton from '../../../../components/GradientButton';
import { MAX_LENGTH_PHONE, MAX_LENGTH_SMS } from '../../../../utils/validation';

const MobileSignIn: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [captcha, setCaptcha] = useState('');

  return (
    <View style={styles.content}>
      <View style={styles.item}>
        <Iconfont style={styles.icon} name="phone" size={Size.px(16)} color={Color.labelColor} />
        <Input
          style={styles.input}
          value={phone}
          onChangeText={value => setPhone(value.trim())}
          placeholder="请输入手机号"
          autoCompleteType="off"
          keyboardType="phone-pad"
          maxLength={MAX_LENGTH_PHONE}
        />
      </View>
      <View style={styles.item}>
        <Iconfont style={styles.icon} name="shield" size={Size.px(16)} color={Color.labelColor} />
        <Input
          style={styles.narrowInput}
          value={captcha}
          onChangeText={value => setCaptcha(value.trim())}
          placeholder="请输入验证码"
          autoCompleteType="off"
          keyboardType="number-pad"
          maxLength={MAX_LENGTH_SMS}
        />
        {/* <Text style={styles.extraText} onPress={() => sendSms(phone, AuthSmsType.LOGIN)}>
          {smsText}
        </Text> */}
      </View>
      <GradientButton style={styles.loginBtn} text="登 录" onPress={() => {}} />
    </View>
  );
};

export default MobileSignIn;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: Size.px(15)
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: Size.px(56),
    paddingLeft: Size.px(12),
    paddingBottom: Size.px(5),
    borderBottomWidth: Size.ONE_PIXEL,
    borderBottomColor: Color.borderColor
  },
  icon: {
    flex: 1,
    height: Size.px(40),
    lineHeight: Size.px(40)
  },
  input: {
    flex: 9,
    fontSize: Size.px(16)
  },
  narrowInput: {
    flex: 6,
    fontSize: Size.px(16)
  },
  extraText: {
    flex: 3,
    textAlign: 'right',
    color: Color.primary,
    paddingRight: Size.px(10),
    fontSize: Size.px(12),
    height: Size.px(40),
    lineHeight: Size.px(40)
  },
  loginBtn: {
    marginTop: Size.px(92)
  }
});
