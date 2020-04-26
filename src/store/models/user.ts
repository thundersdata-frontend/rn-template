import { ModelConfig } from '@ice/store';

/*
 * @文件描述: 和当前登录用户相关的一些属性
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2020-03-31 17:17:54
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-04-26 16:55:31
 */
export interface State {
  // 登录人的姓名
  name: string;
  token: string;
  avatar: string;
}

const userModel: ModelConfig<State> = {
  state: {
    name: '',
    token: '',
    avatar: ''
  },
  reducers: {
    setName(state: State, name: string) {
      state.name = name;
    },

    setToken(state: State, token: string) {
      state.token = token;
    },

    setAvatar(state: State, avatar: string) {
      state.avatar = avatar;
    }
  }
};

export default userModel;
