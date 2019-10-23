import { PersonInfo } from '../interfaces/person';

export const initialPersonInfo: PersonInfo = {
  userId: 0,
  userName: '',
  userBasicInfo: {
    username: '',
  },
};

export class UserStore {
  private static instance: UserStore;
  private constructor() {}

  public static getInstance() {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }

  public userInfo: PersonInfo = initialPersonInfo;
}
