import { BaseEntity } from "./base-entity";
import { User } from "./user";
import { Reader } from "./reader";

export interface Librarian extends BaseEntity {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  hireDate: Date;
  isActive: boolean;
  userId: number;

  // navigation
  user?: User;
  readers?: Reader[];


}