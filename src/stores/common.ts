import Toast from 'react-native-root-toast';
import request from '../utils/request';
import { Colors } from '../config';
import NetInfo from '@react-native-community/netinfo';

export const PAGE = 1;
export const PAGE_SIZE = 10;
export const TOTAL = 0;

// 后端请求地址
export const BACKEND_URL = 'http://localhosh:8000';

// 认证中心请求地址
export const AUTH_URL = 'http://api.dev.thundersdata.com';

// 认证请求参数
export const AUTH_PARAMS = {
  clientId: 'td-data',
  clientSecret: 'td-data',
  appVersion: '1.0',
  scope: 'read',
};

export enum AuthSmsType {
  MODIFY = 1,
  LOGIN = 2,
}

export const initialFetchChartData = {
  title: '',
  subTitle: '',
  data: {
    xAxis: [],
    yAxis: [],
    series: [],
  },
};

export const initialFetchQuotaData = {
  title: '',
  subTitle: '',
  data: [],
};

/**
 * 封装APP内所有的请求
 */
export const FETCH_OPTIONS = Object.freeze({
  // 我的相关
  mine: {
    // 发送短信验证码
    sms: {
      url: AUTH_URL + '/authz/sms/send',
    },
    // 短信登录
    smsLogin: {
      url: AUTH_URL + '/authz/users/smsLogin',
    },
    // 用户名密码登录
    login: {
      url: AUTH_URL + '/authz/oauth/token',
    },
    // 忘记密码
    forget: {
      url: AUTH_URL + '/authz/users/resetPassword',
    },
    // 修改密码
    modify: {
      url: AUTH_URL + '/resource/user/updatePassword',
    },
    // 获取个人信息
    info: {
      url: AUTH_URL + '/resource/rs/getUserInfo',
    },
  },
});

type FetchType = 'get' | 'post' | 'json';

/**
 * 封装公共的发业务请求的方法
 * @param config 配置，包含要请求的url和默认值
 * @param params 请求的参数
 * @param type 请求的类型
 */
export async function fetchData<T>(
  config: { url: string; initialData: T; fetchName?: string },
  params?: object,
  type: FetchType = 'get',
) {
  try {
    const netInfo = await NetInfo.fetch();
    if (netInfo.isConnected) {
      const method = getFetchMethod(type);
      const result = await request[method]<T>(config.url, params);
      if (result.success) {
        return result.data || config.initialData;
      } else {
        config.fetchName && toastFail(`获取${config.fetchName}数据失败`);
      }
      return config.initialData;
    }
    return config.initialData;
  } catch (error) {
    if (error.message === 'cancel') {
      // toastFail('请不要频繁操作');
    } else {
      config.fetchName && toastFail(`获取${config.fetchName}数据失败`);
    }
    return config.initialData;
  }
}

/**
 * 得到request的具体方法
 * @param type
 */
function getFetchMethod(type: FetchType) {
  switch (type) {
    case 'post':
      return 'postForm';

    case 'json':
      return 'postJSON';

    case 'get':
    default:
      return 'get';
  }
}

const toastSettings = {
  duration: 1000,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  textColor: Colors.white,
};

export function toastSuccess(message: string) {
  Toast.show(message, {
    ...toastSettings,
    backgroundColor: Colors.success,
  });
}
export function toastWarning(message: string) {
  Toast.show(message, {
    ...toastSettings,
    backgroundColor: Colors.warning,
  });
}
export function toastFail(message: string) {
  Toast.show(message, {
    ...toastSettings,
    backgroundColor: Colors.fail,
  });
}
