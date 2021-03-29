/** 后端返回的code */
export enum LoginFailure {
  登录过期 = 50400,
  不允许登录 = 50402,
}

/** 获取 验证码方式枚举 */
export enum SmsTypeEnum {
  注册 = 0,
  修改密码 = 1,
  登录 = 2,
}
