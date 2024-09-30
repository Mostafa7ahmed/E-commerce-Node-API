import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import product from "../../models/product";


export const addToWishlistValidator: RequestHandler[] = [
    check('product').isMongoId().withMessage('invalid product id')
        .custom(async (val: string) => {
        const products:any = await product.findById(val);
        if (!products) { throw new Error('Product Not Found') };
        return true;
        }),
    validatorMiddleware
];

export const removeFromWishlistValidator: RequestHandler[] = [
    check('productId').isMongoId().withMessage('invalid product id'),
    validatorMiddleware
];