import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import usersModel from "../../models/usersModel";
import ApiError from "../apiError";



export const createUserValidator: RequestHandler[] = [
    check('name').notEmpty().withMessage('Should Enter Name For Category')
    .isLength({min:2, max:50}).withMessage('Length Of Name Should be between 2 and 50 character'),
    check('email').notEmpty().withMessage('Email is Required')
    .isEmail().withMessage('Invalid Email')
    .custom(async(value:string)=>{
        const emailUser = await usersModel.findOne({email:value});
        if(emailUser){
            throw new ApiError('Email  Already Exist', 400);
        }
        return true;
    }),
    check('password').notEmpty().withMessage('Password Is Required')
    .isLength({min:8, max: 30}).withMessage('password Length greater than 8 char')
    .custom((value:string, {req})=>{
        if(value !== req.body.confirmPassword){
            throw new ApiError('password doesn\'t match', 400);
        }
        return true
    }),
    check('confirmPassword').notEmpty().withMessage('Password Is Required')
    .isLength({min:8, max: 30}).withMessage('password Length greater than 8 char')
    ,
    check('phone').optional().isMobilePhone(['ar-EG']),
    validatorMiddleware
];

export const getUserValidator: RequestHandler[] =[
    check('id').isMongoId().withMessage('This Id Not Valid'),
    validatorMiddleware
]
export const updateUserValidator: RequestHandler[] =[
    check('id').isMongoId().withMessage('This Id Not Valid'),
    check('name').optional().isLength({min:2, max:50}).withMessage('Length should be between 2 and 50 character'),
    check('phone').optional().isMobilePhone(['ar-EG']).withMessage('invalid Egyptian number'),
    check('active').optional().isBoolean().withMessage('active must be true or false'),
    validatorMiddleware
]

export const deleteUserValidator: RequestHandler[] =[
    check('id').isMongoId().withMessage('This Id Not Valid')
    ,validatorMiddleware
]

export const changePasswordValidator: RequestHandler[]=[
    check('id').isMongoId().withMessage('This Id Not Valid'),
    check('password').notEmpty().withMessage('password is Required')
    .isLength({min:8, max: 30}).withMessage('password Length greater 8 char')
    .custom((value:string, {req})=>{
        if(value !== req.body.confirmPassword){
            throw new ApiError('Password  doesn\'t match', 400);
        }
        return true;
    }),
    
    check('confirmPassword').notEmpty().withMessage('password is Required')
    .isLength({min:8, max: 30}).withMessage('password Length greater 8 char'),
    validatorMiddleware
];
