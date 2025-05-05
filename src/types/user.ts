export interface UserInfo {
    username: string;
  }
  
  export interface UserState {
    userInfo: UserInfo | null;
    error: string | null;
  }