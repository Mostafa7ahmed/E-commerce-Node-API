import { Request, Response, NextFunction } from "express";
import asyncHadler from "express-async-handler";
import subcategoryModel from "../models/subcategoryModel";
import { createDoc, deleteOne, getAll, getOne, UpdateOne } from "./refactorHandling";
import { SubCategoryInterface } from "../interfaces/subcategories";
import { FilterData } from "../interfaces/filterData";

// export const filterSubcategories = (req:Request, res:Response, next:NextFunction)=>{
//     let filterData: FilterData = {}
//     if(req.params.categoryId){
//         filterData.category = req.params.categoryId
//         console.log(filterData.category);
//     }
//     req.filterData = filterData;
//     next()
// }

export const filterSubcategories = (req: Request, res: Response, next: NextFunction) => {
    let filterData: FilterData = {};
    if (req.params.categoryId) {
        filterData.category = req.params.categoryId;
    }
    req.filterData = filterData;
    next();
    }


export const getAllSubCategory = getAll<SubCategoryInterface>(subcategoryModel, 'subcategory');
export const createSubCategory = createDoc<SubCategoryInterface>(subcategoryModel);
export const getSubCategory = getOne<SubCategoryInterface>(subcategoryModel);
export const updateSubCategory = UpdateOne<SubCategoryInterface>(subcategoryModel);
export const deleteSubCategory = deleteOne<SubCategoryInterface>(subcategoryModel);


// export const getAllSubCategory = asyncHadler(async(req:Request, res:Response, next:NextFunction)=>{
//     const subcategory = await subcategoryModel.find()
//     res.status(200).json({data:subcategory});
// });

// export const createSubCategory = asyncHadler(async(req:Request, res: Response, next:NextFunction)=>{
//     const subcategory = await subcategoryModel.create(req.body)
//     res.status(201).json({data:subcategory});
// });

// export const getSubCategory = asyncHadler(async(req:Request, res:Response, next:NextFunction)=>{
//     const sub = await subcategoryModel.findById(req.params.id);
//     res.status(200).json({
//         data: sub
//     });
// });
// export const updateSubCategory = asyncHadler(async(req:Request, res:Response, next:NextFunction)=>{
//     const sub = await subcategoryModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
//     res.status(201).json({
//         data: sub
//     });
// });
// export const deleteSubCategory = asyncHadler(async(req:Request, res:Response, next:NextFunction)=>{
//     const sub = await subcategoryModel.findByIdAndDelete(req.params.id);
//     res.status(204).json();
// });