import { Router } from "express";
import { getAllSubCategory, getSubCategory, updateSubCategory, deleteSubCategory, createSubCategory,filterSubcategories } from "../controllers/subcategories";
import * as all from "../interfaces"

import { createSubCategoryValidator, updateSubCategoryValidator,deleteSubCategoryValidator, getSubCategoryValidator } from "../utils/validator/subCategoryValidator";
import { allowedTo, checkActiveUser, protectRoutes } from "../controllers/auth";



const subcategoryRoute: Router = Router({mergeParams:true});

subcategoryRoute.route('/')
    .get(filterSubcategories,getAllSubCategory)
    .post(protectRoutes, checkActiveUser,allowedTo('manager', 'admin'),createSubCategoryValidator,createSubCategory)

subcategoryRoute.route('/:id')
    .get(getSubCategoryValidator,getSubCategory)
    .put(protectRoutes, checkActiveUser,allowedTo('manager', 'admin'),updateSubCategoryValidator,updateSubCategory)
    .delete(protectRoutes, checkActiveUser,allowedTo('manager', 'admin'),deleteSubCategoryValidator,deleteSubCategory)
    

export default subcategoryRoute;