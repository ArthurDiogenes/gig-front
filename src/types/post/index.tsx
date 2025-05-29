import { User } from "../user";

export type Post = {
  id: number;
  content: string;
  comments: Comment[];
  imageUrl?: string
}

export type Comment = {
  id: number;
  comment: string;
  user: User;
  createdAt: Date;
}