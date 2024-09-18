import { TUser } from "./user";

export type TReview = {
  _id: string;
  user: TUser;
  comment: string;
  rating: number;
};
