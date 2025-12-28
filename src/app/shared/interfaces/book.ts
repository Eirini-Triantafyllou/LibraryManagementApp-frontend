import { BaseEntity } from "./base-entity";
import { Author } from "./author";
import { Reader } from "./reader";

export interface Book extends BaseEntity {
  id: number;
  title: string;
  description: string;
  isbn: string;
  authorId: number;
  publishedDate: Date;
  copiesAvailable: number;
  
  // Navigation properties (για relations)
  author?: Author;
  readers?: Reader[];
}