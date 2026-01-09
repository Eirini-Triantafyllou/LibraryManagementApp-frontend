import { BaseEntity } from "./base-entity";
import { Book } from "./book";
import { User } from "./user";
import { Author } from "./author";

export interface Wishlist extends BaseEntity{
  id: number;
  userId: number;
  bookId: number;
  user?: User;
  book?: Book;
  addedAt: Date;
}

// DTO

export interface WishlistItemDTO {
  id: number;
  bookId: number;
  title: string;
  isbn: string;
  authorName: string;
  addedAt: Date;
}
