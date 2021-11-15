export function mockLogin(values: unknown): Promise<Token> {
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

export function mockRegister(values: unknown): Promise<boolean> {
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

export function mockUpdatePassword(values: unknown): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export function mockConfigPassword(values: unknown): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export function mockResetPassword(values: unknown): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export function mockSendSms(values: unknown): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export function mockChangeAvatar(values: unknown): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export function mockUpdateUsername(values: unknown): Promise<boolean> {
  console.log(values);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}
