import { Document } from "mongoose";
import { Categories } from "./categories";
import { SubCategoryInterface } from "./subcategories";



export interface Product extends Document{
    name: string;
    description: string;
    category: Categories;
    subcategory: SubCategoryInterface;
    quantity: number;
    sold: number;
    price: number;
    stock: number;
    priceAfterDiscount: number;
    cover: string;
    images: string[]
    ratingAverage: number;
    ratingCount: number;
};