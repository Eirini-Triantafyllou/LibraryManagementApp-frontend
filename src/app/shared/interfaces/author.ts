import { BaseEntity } from "./base-entity";
import { Book } from "./book";

export interface Author extends BaseEntity {
  id: number;
  fullName: string;
  biography: string;
  dateOfBirth: Date;

  books?: Book[];   // Navigation properties (για relations)

}