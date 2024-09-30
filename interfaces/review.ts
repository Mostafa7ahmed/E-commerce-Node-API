import { Document } from "mongoose";
import { Product } from "./product";
import { Users } from "./users";

export interface Review extends Document{
    comment:string;
    rating: number;
    product:Product;
    user:Users
}

