import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import categoriesModel from "../../models/categoriesModel";



export const createCategoryValidator: RequestHandler[] = [
    check('name').notEmpty().withMessage('Should Enter Name For Category')
    .isLength({min:2, max:50}).withMessage('Length Of Name Should be between 2 and 50 character')
    .custom(async(value:string)=>{
        const category = await categoriesModel.findOne({name: value});
        if(category){
            throw new Error('Category is already exist');
        }
        return true;
    }),
    validatorMiddleware
];

export const getCategoryValidator: RequestHandler[] =[
    check('id').isMongoId().withMessage('This Id Not Valid'),
    validatorMiddleware
]
export const updateCategoryValidator: RequestHandler[] =[
    check('id').isMongoId().withMessage('This Id Not Valid'),
    check('name').optional().isLength({min:2, max:50}).withMessage('Length should be between 2 and 50 character'),
    validatorMiddleware
]

export const deleteCategoryValidator: RequestHandler[] =[
    check('id').isMongoId().withMessage('This Id Not Valid')
    ,validatorMiddleware
]
