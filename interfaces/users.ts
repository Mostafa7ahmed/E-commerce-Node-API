import { Document } from "mongoose";
import { Product } from "./product";


export interface Users extends Document{
    name: string,
    email: string,
    password: string,
    phone: string,
    role : UserRole,
    active: boolean,
    image: string,
    wishlist: Product[],
    address: UserAddress[];
    restCode: string;
    passwordChangedAt: Date | number,
    restCodeExpireTime: Date | number | undefined,
    restCodeVerify: Boolean | undefined
}

type UserRole = 'manger' | 'admin' | 'user';
export interface UserAddress{
    street:string;
    city:string;
    state:string;
    postalCode:string;
}