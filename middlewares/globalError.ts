import { NextFunction, Request, Response } from "express";
import { CustomError } from "../interfaces/customError";





const globalError = (error: CustomError, req:Request, res:Response, next:NextFunction)=>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'Server Error';
    
    if(process.env.NODE_ENV == 'dev'){
        res.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message,
            status: error.status,
            stack: error.stack
        })
    }else{
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        })
    }
}

export default globalError