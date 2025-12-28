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
}

export interface UserSignupDTO {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  adress: string;
  userRole: UserRole;
}

export interface UserReadOnlyDTO {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  userRole: string;
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
  username: string;
  password: string;
  keepLoggedIn: boolean;
}

export interface UserFiltersDTO {
  username?: string;
  email?: string;
  userRole?: string;
}



// αυτά είναι από το μάθημα και το πρώτο δικό μου νομιζω,
// μάλλον τα credentials είναι το αντίστοιχο UserLoginDTO
// αν δεν κάνω λαθος (και να δω σε τι μπορεί να αντιστοιχεί
// ο loggedInUser και αν δεν αντιστοιχεί κάπου να το αφήσω 
// ενεργοποιημένο, και τσεκ για userRole μήπως το αφήσω 
// και αυτό ανοιχτό)



// export interface Credentials {
//   username: string;
//   password: string;
// }

export interface LoggedInUser {
  username: string;
  email: string;
  roles: UserRole;
}

// pagination (μήπως μπει αλλου)

export interface PaginatedResult<T> {
  data: T[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
}

export interface TokenResponse {
  token: string;
  userId: number;
  username: string;
  email: string;
  role: string;
}
