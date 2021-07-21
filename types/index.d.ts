interface Page<T> {
  list?: Array<T>;
  page?: number;
  pageSize?: number;
  total?: number;
  totalPage?: number;
}

type UserInfo = any;
