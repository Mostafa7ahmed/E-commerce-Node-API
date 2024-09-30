import { model, Schema } from "mongoose";
import { Review } from "../interfaces/review";
import product from "./product";

const ReviewSchema:Schema = new Schema<Review>({
    comment:{type:String, required:true, trim:true},
    rating:{type:Number, required:true, min:1, max:5},
    product:{type:Schema.Types.ObjectId, ref:'products'},
    user:{type:Schema.Types.ObjectId, ref:'users'},
},{
    timestamps:true
});

ReviewSchema.statics.calcRatingAndQuantity = async function (productId) {
    const result = await this.aggregate([
        {$match: {product: productId}},
        {$group: {_id:'product', avgRating: {$avg: '$rate'}, ratingQuantity:{$sum:1}}}        
    ]);
    if(result.length > 0){
        await product.findByIdAndUpdate(productId,{
            ratingAverage: result[0].avgRating,
            ratingCount: result[0].ratingQuantity
        })
    }else{
        await product.findByIdAndUpdate(productId,{
            ratingAverage:0,
            ratingCount: 0
        })
    }
};
ReviewSchema.post<Review>('save', async function(){
    await (this.constructor as any).calcRatingAndQuantity(this.product)
} );
ReviewSchema.post<Review>('findOneAndDelete', async function () { await (this.constructor as any).calcRatingAndQuantity(this.product) })
ReviewSchema.pre<Review>(/^find/, function(next){
    this.populate({path: 'user', select: 'name image'})
    next();
});
ReviewSchema.pre<Review>('find', function(next){
    this.populate({path: 'product', select: 'name cover'});
    next();
});

export default model<Review>('reviews', ReviewSchema);

