import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import usersModel from "../models/usersModel";




export const getAllWishList = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    const user = await usersModel.findById(req.user?._id).populate('wishlist');
    res.status(200).json({ length: user?.wishlist.length, data: user?.wishlist });
});

export const addProductToWishList = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    const user  = await usersModel.findByIdAndUpdate(req.user?._id,
        {$addToSet:{wishlist:req.body.product}},
        {new:true}
    );
    res.status(200).json({length:user?.wishlist.length, data:user?.wishlist})
});

export const deleteProductFromWishList = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    const  user  = await usersModel.findByIdAndUpdate(req.user?._id,
        {$pull:{wishlist:req.params.product}},
        {new:true}
    );
    res.status(204).json()
})