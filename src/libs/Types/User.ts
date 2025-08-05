export interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
  password?: string;
  passwordLastupdated?: Date;
  isDeleted?: boolean;
}
