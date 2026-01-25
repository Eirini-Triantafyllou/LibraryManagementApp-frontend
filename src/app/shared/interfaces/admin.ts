import { BaseEntity } from "./base-entity";
import { User } from "./user";
import { Book } from "./book";
import { UserRole } from "../enums/user-role";

export interface Admin extends BaseEntity {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  address: string;
  userId: number;

  // Navigation property
  user?: User;
}