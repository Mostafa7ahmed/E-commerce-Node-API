
import { Users } from "../interfaces/users"
import { getAll, createDoc, UpdateOne, deleteOne, getOne } from "./refactorHandling"
import usersModel from "../models/usersModel"
import { uploadSingleImage } from "../middlewares/uploadImage"
import asyncHandler from "express-async-handler";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs'

export const uploadUserImage = uploadSingleImage('image');
export const resizeUserImage = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    if(req.file){
        const imgName = `user-${Date.now()}.webp`
        await sharp(req.file.buffer)
        .toFormat('webp')
        .webp({quality: 95})
        .toFile(`uploads/users/${imgName}`)
        req.body.image = imgName;
    }
    next();
});


export const getAllUsers = getAll<Users>(usersModel, 'users')
export const getUser = getOne<Users>(usersModel)
export const createUser = createDoc<Users>(usersModel);
export const deleteUser = deleteOne<Users>(usersModel);
export const updateUser = asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
    const user = await usersModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        image: req.body.image,
        active: req.body.active
    },{new: true});
    res.status(200).json({data: user});
});

export const changeUserPassword = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    const user = await usersModel.findByIdAndUpdate(
        req.params.id,
        {
            password: bcrypt.hash(req.body.password, 15),
            passwordChangedAt: Date.now()
        },
        {new:true}
    )
});

