declare module '*.png';
declare module '*.jpg';
declare module '*.webp';
declare module '*.gif';

type QueryKey = [string, Obj] | [string];

interface PageParams {
  page: number;
  pageSize: number;
}

interface Page<T> extends PageParams {
  list: Array<T>;
  total: number;
  totalPage?: number;
}

type UserInfo = {
  userId?: number;
  userName?: string;
  profilePicture?: string;
};

interface Token {
  accessToken?: string;
  refreshToken?: string;
  tokenExpireTime?: string;
  tokenExpiresIn?: number;
  userId?: number;
  ispassword?: boolean;
}

interface AjaxResponse<T = unknown> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

type Obj = Record<string, any>;

type ReactText = string | number;
