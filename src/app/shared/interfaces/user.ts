import { UserRoleEnum } from "../enums/user-role-enum";

export interface User {
  Id: number;
  Username: string;
  Email: string;
  Password: string;
  Firstname: string;
  Lastname: string; 
  UserRole: UserRole;
}

// export interface UserRole {
//   role: string;
//   active: boolean;
// }

export interface UserRole {
    role: UserRoleEnum;
    active: boolean;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface LoggedInUser {
  username: string;
  email: string;
  roles: UserRole;
}
