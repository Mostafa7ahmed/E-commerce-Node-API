import { Document } from "mongoose";
import { Categories } from "./categories";

export interface SubCategoryInterface extends Document{
    name: string;
    image: string;
    category: Categories;
}