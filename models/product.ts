import { model, Schema } from "mongoose";
import { Product } from "../interfaces/product";


const productSchema: Schema = new Schema<Product>({
    name: {type: String, required:true, trim:true},
    description:{type:String, required:true, trim:true},
    price:{type:Number, required:true, min:1, max:1000000},
    priceAfterDiscount:{type:Number,  min:1, max:1000000},
    ratingAverage: Number,
    ratingCount: Number,
    quantity: { type:Number, min:0, default:0},
    sold:{type:Number, default:0},
    cover: String,
    images: [String],
    category: {type: Schema.Types.ObjectId, ref: 'categories'},
    subcategory: {type: Schema.Types.ObjectId, ref: 'subcategory'},    
},{
    timestamps: true
})


productSchema.pre<Product>(/^find/, function(next){
    this.populate({path: 'category', select: 'name'}),
    this.populate({ path: 'subcategory', select: 'name' });
    next();
});

export default model<Product>('products', productSchema)