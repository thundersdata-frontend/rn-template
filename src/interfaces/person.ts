export interface PersonInfo {
  userId: number;
  userName: string;
  userBasicInfo: {
    username: string;
    nickName?: string;
  };
}
