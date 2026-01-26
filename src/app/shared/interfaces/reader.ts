import { BaseEntity } from "./base-entity";
import { User } from "./user";
import { Book } from "./book";
import { UserRole } from "../enums/user-role";

export interface Reader extends BaseEntity {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  address: string;
  membershipDate: Date;
  isActive: boolean;
  booksBorrowedCount: number;
  userId: number;

  // Navigation properties
  user?: User;
  books?: Book[];
}



