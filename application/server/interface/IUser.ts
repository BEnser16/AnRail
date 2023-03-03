//  帳戶的資料模型
export interface IUser {
  docType?: string;
  userID: string;
  username: string;
  birthDate: Date;
  email: string;
  phone: number;
  password: string;
  role?: string;
}
