/** 用户名校验正则 */
export const userNamePattern = /^[a-z0-9A-Z0-9\-\_@]+$/;
/** 密码校验正则 */
export const passwordPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
/** 手机号校验正则 */
export const mobilePattern = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;

export const mobilePhoneRules = [
  {
    required: true,
    message: '请输入手机号',
  },
  {
    pattern: mobilePattern,
    message: '手机号格式不正确',
  },
];

export const passwordRules = [
  { required: true, message: '请输入密码' },
  { pattern: passwordPattern, message: '密码格式不正确' },
];
