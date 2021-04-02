export const mobilePhoneRules = [
  {
    required: true,
    message: '请输入手机号',
  },
  {
    pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
    message: '手机号格式不正确',
  },
];

export const passwordRules = [
  { required: true, message: '请输入密码' },
  { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码格式不正确' },
];
