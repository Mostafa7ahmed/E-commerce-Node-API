import { Schema, model } from 'mongoose';
import { Categories } from '../interfaces/categories';



const categoriesSchema = new Schema<Categories>(
    {
        name: {type: String, required:true, unique:true, trim:true},
        image: String
    }, {
        timestamps: true
    }
);


export default model<Categories>('categories', categoriesSchema);
