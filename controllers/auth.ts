import { Request, Response,NextFunction } from "express";
import asyncHandler from "express-async-handler";
import usersModel from "../models/usersModel";
import bcrypt from 'bcryptjs'
import ApiError from "../utils/apiError";
import Jwt  from "jsonwebtoken";
import { createRestToken, createToken } from "../utils/createToken";
import { Users } from "../interfaces/users";
import sendMail from "../utils/sendMail";


// signup
export const signUp = asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
    const user:Users = await usersModel.create(req.body);
    const token = createToken(user._id, user.role);

    res.status(201).json({
        token: token,
        data:user
    });
});

// login
export const login = asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
    const user = await usersModel.findOne({email:req.body.email});
    
    if(!user || !( await bcrypt.compare(req.body.password, user.password))){
        return next(new ApiError('Invalid Email Or Password', 401))
    };
    const token = createToken(user._id, user.role);
    res.status(200).json({
        token: token,
        data: user
    });
});


// Protect Route
export const protectRoutes = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    // 1- get token
    let token: string = '';
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }else{
        return next(new ApiError('Please Login First', 401));
    }
    // 2- decoded token
    const decodedToken:any = Jwt.verify(token, process.env.JWT_KEY!);
    //3- check if user still exists in db
    const user = await usersModel.findById(decodedToken._id);
    if(!user){
        return next(new ApiError('user not found', 404))
    }
    if (user.passwordChangedAt instanceof Date) {
        const changeTime: number = parseInt((user.passwordChangedAt.getTime() / 1000).toString())
        if (changeTime > decodedToken.iat) { return next(new ApiError('please login again', 401)) }
    }
    // 4- check change password
    req.user = user;
    next()
});


// check Active 
export const checkActiveUser = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    if(!req.user?.active){
        return next(new ApiError('This User Not Active', 403));
    }
    next();
});


// Allowed To 
export const allowedTo = (...roles:string[])=>asyncHandler((req:Request, res:Response, next:NextFunction)=>{
    if(!roles.includes(req.user?.role!)){
        return next(new ApiError('Not Allowed to you', 403))
    }
    next();
});

//Forget Password
export const forgetPassword = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    // email => restCode If code True ChangePassword another error
    const user = await usersModel.findOne({email:req.body.email});
    if(!user){ return next(new ApiError('This User Not Found Signup', 404))}
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    user.restCode = resetCode.toString();
    user.restCodeExpireTime = Date.now() +  (5 * 60 * 1000);
    user.restCodeVerify = false
    const message:string = `Reset Code is ${resetCode}`
    try{
        await sendMail({email:user.email, subject:'Reset Password', message})
        await user.save({validateModifiedOnly:true});
    }catch(err){
        console.log(err)
        return next(new ApiError('error sending email', 400));
    }
    const resetToken: string = createRestToken(user._id);
    res.status(200).json({ message: 'reset password code sent to your email', resetToken })
});

// Verify Reset Code
export const VerifyResetCode = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    let token:string = ''
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];    
    }else{
        return next(new ApiError('Not authorization', 401));
    }
    const decoded:any = Jwt.verify(token, process.env.JWT_KEY!);
    const user:any = await usersModel.findById(decoded._id);
    if(Date.parse(user?.restCodeExpireTime)  < Date.now()){
        return next(new ApiError('Reset Code Expire', 400))
    }
    if(user.restCode ===  req.body.restCode){
        user.restCodeVerify = true;
    }
    
    await user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: 'reset code verified' });
});

export const resetCode = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    let token:string = '';
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }else{
        return next(new  ApiError('Not authorization', 401));
    }
    const decoded:any = Jwt.verify(token, process.env.JWT_KEY!);
    const user:any = await usersModel.findById(decoded._id);
    if(!user){ return next(new ApiError('User Not Found', 404)) }
    if(!user.restCodeVerify == true){ return next(new ApiError('Reset Code Already Verified',400))}

    user.password = req.body.password,
    user.restCode = undefined,
    user.restCodeVerify = false,
    user.restCodeExpireTime =undefined;
    user.passwordChangedAt = Date.now()
    await user.save({validateModifiedOnly:true});
    res.status(200).json({ message: 'password Changed successfully' });
});