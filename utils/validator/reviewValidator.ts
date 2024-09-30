import { RequestHandler } from "express";
import { check } from "express-validator";
import reviewModel from "../../models/reviewModel";
import { validateHeaderName } from "http";
import validatorMiddleware from "../../middlewares/validatorMiddleware";



export const CreateReviewValidator: RequestHandler[]=[
    check('comment').notEmpty().withMessage('Comment is Required')
    .isLength({min:2,max:500 }).withMessage('Length of comment Invalid'),
    check('rating').notEmpty().withMessage('Rating is Required')
    .isFloat({min:1, max:5}).withMessage('invalid rate'),
    check('product').notEmpty().withMessage('Product is Required')
    .isMongoId().withMessage('Invalid product Id'),
    check('user').notEmpty().withMessage('user is Required')
    .isMongoId().withMessage('Invalid user Id')
    .custom(async(val:string)=>{
        const review = await reviewModel.findOne({user:val});
        if(review){ throw new Error('you Created review Before')};
        return true;
    }),
    validatorMiddleware
]
export const getReviewValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('invalid mongo id'),
    validatorMiddleware
];
export const updateReviewValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('invalid mongo id')
    .custom(async (val: string, { req }) => {
        const review = await reviewModel.findById(val);
    if (review?.user._id!.toString() !== req.user._id.toString()) {
        throw new Error('you can only update your review');
    }
        return true;
    }),
    check('comment')
    .optional().isLength({ min: 10, max: 500 }).withMessage('invalid comment length'),
    check('rating')
    .optional().isFloat({ min: 1, max: 5 }).withMessage('invalid rate'),
    validatorMiddleware
];

export const deleteReviewValidator: RequestHandler[] = [
        check('id').isMongoId().withMessage('invalid mongo id')
        .custom(async (val: string, { req }) => {
            if (req.user.role === 'user') {
            const review = await reviewModel.findById(val);
            if (review?.user._id!.toString() !== req.user._id.toString()) {
                throw new Error('you can only update your review');
            }
            }
            return true;
        }),
        validatorMiddleware
];