export function mockLogin(values: Obj): Promise<Token> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        accessToken: '123',
        refreshToken: '123',
        tokenExpireTime: '2022-12-30 23:59:59',
        tokenExpiresIn: 9999999999,
      });
    }, 2000);
  });
}

export function mockRegister(values: Obj): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export function mockFetchUserInfo(): Promise<UserInfo> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        userId: 123,
        userName: 'zhangsan',
      });
    }, 2000);
  });
}

export function mockUpdatePassword(values: Obj): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export function mockConfigPassword(values: Obj): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export function mockResetPassword(values: Obj): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export function mockSendSms(values: Obj): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export function mockChangeAvatar(values: Obj): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export function mockUpdateUsername(values: Obj): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}
