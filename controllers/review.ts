import { Model, Document } from "mongoose";
import { Review } from "../interfaces/review";
import reviewModel from "../models/reviewModel";
import { createDoc, deleteOne, getAll, getOne, UpdateOne} from "./refactorHandling";
import { NextFunction, Request, Response } from "express";
import { FilterData } from "../interfaces/filterData";

export const filterReviews = (req:Request, res:Response, next:NextFunction)=>{
    let filterData: FilterData = {};
    if(req.params.productId){ filterData.product = req.params.productId}
    if(req.user?._id && !req.params.productId){
        filterData.user = req.user?._id;
    };
    next();
};
export const setProductAndUserId = (req:Request, res:Response, next:NextFunction)=>{
    if(!req.body.user){
        req.body.user = req.user?._id
    };
    if(!req.body.product){
        req.body.product = req.params.productId
    };
    next();
};

export const getAllReviews = getAll<Review>(reviewModel, 'reviews');
export const CreateReview = createDoc<Review>(reviewModel);
export const getReview = getOne<Review>(reviewModel);
export const  updateReview = UpdateOne<Review>(reviewModel);
export const deleteReview = deleteOne<Review>(reviewModel);