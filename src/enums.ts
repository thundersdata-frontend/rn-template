/** 后端返回的code */
export enum LoginFailureEnum {
  登录无效 = 40006,
  登录过期 = 40006,
  登录禁止 = 40010,
}

/** 获取 验证码方式枚举 */
export enum SmsTypeEnum {
  注册 = 0,
  修改密码 = 1,
  登录 = 2,
}

/** 下拉刷新状态枚举 */
export enum RefreshStateEnum {
  /**加载成功 */
  Idle = 0,
  /**开始下拉刷新 */
  HeaderRefreshing = 1,
  /**开始上拉翻页 */
  FooterRefreshing = 2,
  /**已加载全部数据 */
  NoMoreData = 3,
  /**加载失败 */
  Failure = 4,
  /**没有数据 */
  EmptyData = 5,
}
