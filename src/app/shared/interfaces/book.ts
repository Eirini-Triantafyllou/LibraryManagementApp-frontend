import { BaseEntity } from "./base-entity";
import { Author } from "./author";
import { Reader } from "./reader";
import { StickyOffset } from "@angular/cdk/table";

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

// DTOs

export interface BookByAuthorDTO {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedDate: Date;
  copiesAvailable: number;
  authorFullName: string;
  authorId: number;
  isInWishlist?: boolean;
}

export interface CreateBookDTO {
  title: string;
  authorFullName: string;
  description: string;
  isbn: string;
  publishedDate: Date;
  copiesAvailable: number;
}

export interface UpdateBookDTO {
  title: string;
  description: string;
  copiesAvailable: number;
}