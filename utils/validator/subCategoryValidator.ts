import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import categoriesModel from "../../models/categoriesModel";


export const createSubCategoryValidator: RequestHandler[] = [
    check('name').notEmpty().withMessage('Should Enter Name For Category')
    .isLength({min:2, max:50}).withMessage('Length Of Name Should be between 2 and 50 character')
    .custom(async(value:string)=>{
        const category = await categoriesModel.findOne({name: value});
        if(category){
            throw new Error('Category is already exist');
        }
        return true;
    }),
    check('category').notEmpty().withMessage('invalid category id')
    .isMongoId().withMessage('Invalid  id'),
    validatorMiddleware
];

export const getSubCategoryValidator: RequestHandler[] =[
    check('id').isMongoId().withMessage('This Id Not Valid'),
    validatorMiddleware
]
export const updateSubCategoryValidator: RequestHandler[] =[
    check('id').isMongoId().withMessage('This Id Not Valid'),
    check('name').optional().isLength({min:2, max:50}).withMessage('Length should be between 2 and 50 character'),
    check('category').optional().isMongoId().withMessage('invalid id'),
    validatorMiddleware
]

export const deleteSubCategoryValidator: RequestHandler[] =[
    check('id').isMongoId().withMessage('This Id Not Valid')
    ,
    validatorMiddleware
]
