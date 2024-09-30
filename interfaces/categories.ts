import { Document } from "mongoose";
export interface Categories extends Document {
    name: string;
    image: string;
}