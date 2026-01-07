import { UserRole } from "../enums/user-role";
import { BaseEntity } from "./base-entity";
import { Reader } from "./reader";
import { Librarian } from "./librarian";

export interface User extends BaseEntity {
  id: number;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string; 
  userRole: UserRole; 
  phoneNumber: string;
  address: string;

  reader?: Reader;
  librarian?: Librarian;
}              

export interface UserRoleActivity {
    role: UserRole;
    active: boolean;
}


// DTOs

export interface JwtTokenDTO {
  token: string;
  user: UserReadOnlyDTO;
  expiresAt: Date;
}

export interface UserSignupDTO {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
  userRole: UserRole;
}

export interface UserReadOnlyDTO {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  userRole: UserRole;
}

export interface UserReaderReadOnlyDTO extends UserReadOnlyDTO {
  password: string;
  phoneNumber: string;
  address: string;
}

export interface UpdateUserReaderDTO {
  username: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  phoneNumber?: string;
  address?: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

export interface UserFiltersDTO {
  username?: string;
  email?: string;
  userRole?: string;
}


export interface LoggedInUser {
  username: string;
  email: string;
  userRole: UserRole;
}


export interface TokenResponse {
  token: string;
  userId: number;
  username: string;
  email: string;
  role: string;
}
