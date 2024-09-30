import { Schema, model } from "mongoose";
import { SubCategoryInterface } from "../interfaces/subcategories";






const subcategorySchema: Schema = new Schema<SubCategoryInterface>({
    name:{type: String, required:true, unique: true,trim:true},
    image: String,
    category:{type:Schema.ObjectId, required:true , ref : 'categories'}
},{
    timestamps: true
});


subcategorySchema.pre<SubCategoryInterface>(/^find/, function (next){
    this.populate({path: 'category', select: 'name'});
    next();
})
export default model<SubCategoryInterface>('subcategory', subcategorySchema)