import { Document } from "mongoose";
import { Users } from "./users";
import { Product } from "./product";



export interface Carts extends Document{
    items: CartItems[];
    totalPrice: number;
    totalPriceAfterDiscount: number | undefined;
    user: Users;
}

export interface CartItems{
    _id?:string;
    product: Product;
    quantity:number;
    price:number;
}