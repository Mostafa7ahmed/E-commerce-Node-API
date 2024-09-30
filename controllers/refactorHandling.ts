import asyncHandler from 'express-async-handler';
import mongoose, { Model, modelNames , ObjectId} from "mongoose";
import { Request, Response, NextFunction } from "express";
import { FilterData } from '../interfaces/filterData';
import ApiError from '../utils/apiError';
import Features from '../utils/feature';


//Make GRUD Operation to used easy
// GETALL CREATE GETONE UPDATE DELETE


                     //interface pass
// export const getAll = <modelType>(model:Model<any> , modelNames:string )=>
//     asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
//         let filterData: any = {}
//         if(req.filterData){
//             filterData = req.filter
//         }
//         const doc: modelType[] = await model.find(filterData)
//         res.status(200).json({
//             data: doc
//         })
//     });

// export const getAll = <modelType>(model: Model<any>, modelName: string) =>
//     asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//         let filterData: any = {};
//         let searchLength:number =0;
//         if (req.filterData) {
//             filterData = req.filterData;
//         }
//         if(req.query){
//             const searchResult:Features = new Features(model.find(filterData), req.query);
//             const searchData:modelType[] = await searchResult.mongooseQuery;
//             searchLength = searchData.length;
//         }
//         const documentCount =  searchLength|| await model.find().countDocuments()
//         const feature: Features = new Features(model.find(filterData), req.query).sort().limitFields().search(modelName).pagination(documentCount)
//         // const documents: modelType[] = await model.find(filterData)
//         const { mongooseQuery, paginationResult} = feature;
//         const documents: modelType[] = await mongooseQuery;
//         res.status(200).json({ length:documents.length ,pagination: paginationResult ,data: documents })
//     });



    export const getAll = <modelType>(model: Model<any>, modelName: string) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            let filterData: any = {};
            let searchLength: number = 0;
            if (req.filterData) {
                filterData = req.filterData
            }
            if (req.query) {
                const searchResult: Features = new Features(model.find(filterData), req.query).filter().search(modelName)
                const searchData: modelType[] = await searchResult.mongooseQuery;
                searchLength = searchData.length;
            }
            const documentsCount: number = searchLength || await model.find(filterData).countDocuments()
            const features: Features = new Features(model.find(filterData), req.query).filter().sort().limitFields().search(modelName).pagination(documentsCount);
            const { mongooseQuery, paginationResult } = features
            const documents: modelType[] = await mongooseQuery;
            res.status(200).json({ length: documents.length, pagination: paginationResult, data: documents })
        });


export const createDoc = <modelType>(model:Model<any>) =>
    asyncHandler(async(req:Request, res: Response, next:NextFunction)=>{
        const doc:modelType = await model.create(req.body);
        res.status(201).json({
            data: doc
        })
    });

export const getOne = <modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
        const doc:modelType | null = await model.findById(req.params.id);
        if(!doc){
            return next(new ApiError('Document Not Found', 404));
        }
        res.status(200).json({
            data: doc
        })
    });
export const UpdateOne = <modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
        const doc:modelType | null  = await model.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!doc){
            return next(new ApiError('Document Not Found', 404));
        }
        res.status(200).json({
            data: doc
        })
    });
export const deleteOne = <modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
        const doc:modelType | null  = await model.findByIdAndDelete(req.params.id);
        if(!doc){
            return next(new ApiError('Document Not Found', 404));
        }
        res.status(204).json()
    });




    /// delete review is Task for sunday !Very Important