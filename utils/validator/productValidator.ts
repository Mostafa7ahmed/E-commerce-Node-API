import { Request, RequestHandler } from "express";
import { check } from "express-validator";
import categoriesModel from "../../models/categoriesModel";
import subcategoryModel from "../../models/subcategoryModel";
import validatorMiddleware from "../../middlewares/validatorMiddleware";


export const createProductValidator: RequestHandler[] = [
    check('name').notEmpty().withMessage('Should be Enter name of Product')
    .isLength({min:2, max:50}).withMessage('Should be Length of Name Between 2 && 50 char'),
    check('description').notEmpty().withMessage('Should be Enter description of Product')
    .isLength({min:2, max: 600}).withMessage('Should be length of description between 2 && 600'),
    check('quantity').optional().isNumeric().toInt(),
    check('price').notEmpty().withMessage('Should be Enter Your Price').isFloat().withMessage('Should be a valid price')
    .custom((value)=>{
        if(value < 0){
            throw new Error("Price should be greater than zero")
        }
        return true
    }),
    // check('priceAfterDiscount').isFloat().withMessage('Enter Value Price')
    // .custom((value: number, {req})=>{
    //     if(value < 0 || value > req.body.price){
    //         throw new Error('Invalid price Discount')
    //     }
    //     return true
    // }),
    check('category').isMongoId().custom(async(value) => {
        const cat = await categoriesModel.findById(value);
        if(!cat){
            throw new Error("Category Not Found");
        }
        return true
    })
    ,check('subcategory').isMongoId().custom(async(value, {req}) => {
        const sub_cat = await subcategoryModel.findById(value);
        if(!sub_cat){
            throw new Error('SubCategory Not Found');
        }
        if(sub_cat.category.id.toString() != req.body.category){
            throw new Error('Category Not Found');
        }
        return true;
    }
    ),
    validatorMiddleware
]

export const getProductValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Id'),
    validatorMiddleware
]


export const updateProductValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Id'),
    check('name').optional().notEmpty().withMessage('Should be Enter name of Product')
    .isLength({min:2, max:50}).withMessage('Should be Length of Name Between 2 && 50 char'),
    check('description').optional().notEmpty().withMessage('Should be Enter description of Product')
    .isLength({min:2, max: 600}).withMessage('Should be length of description between 2 && 600'),
    check('quantity').optional().isNumeric().toInt(),
    check('price').optional().notEmpty().withMessage('Should be Enter Your Price').isFloat().withMessage('Should be a valid price')
    .custom((value)=>{
        if(value < 0){
            throw new Error("Price should be greater than zero")
        }
        return true
    }),
    check('priceAfterDiscount').optional().isFloat().withMessage('Enter Value Price')
    .custom((value: number, {req})=>{
        if(value < 0 || value > req.body.price){
            throw new Error('Invalid price Discount')
        }
        return true
    }),
    check('category').optional().isMongoId().custom(async(value) => {
        const cat = await categoriesModel.findById(value);
        if(!cat){
            throw new Error("Category Not Found");
        }
        return true
    })
    ,check('subcategory').optional().isMongoId().custom(async(value, {req}) => {
        const sub_cat = await subcategoryModel.findById(value);
        if(!sub_cat){
            throw new Error('SubCategory Not Found');
        }
        if(sub_cat.category.id.toString() != req.body.category){
            throw new Error('Category Not Found');
        }
        return true;
    }),
    validatorMiddleware
]


export const deleteProductValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Id'),
    validatorMiddleware
]