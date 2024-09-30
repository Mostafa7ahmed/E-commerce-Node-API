import { Router } from "express";
import { getAllCategories, createCategories, getCategory, updatecategory, deletecategory } from "../controllers/categories";
import subcategoryRoute from "./subcategory";
import * as all from "../interfaces"
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utils/validator/categoryValidator";
import { allowedTo, checkActiveUser, protectRoutes } from "../controllers/auth";

const categoriesRoute: Router = Router();

categoriesRoute.use('/:categoryId/subcategories', subcategoryRoute)

categoriesRoute.route('/')
    .get(getAllCategories)
    .post(protectRoutes, checkActiveUser,allowedTo('manager', 'admin'),createCategories);
    // .post(protectRoutes, checkActiveUser,allowedTo('manager', 'admin'),createCategoryValidator,createCategories);

categoriesRoute.route("/:id")
    .get(getCategoryValidator,getCategory)
    .put(protectRoutes, checkActiveUser,allowedTo('manager', 'admin'),updateCategoryValidator,updatecategory)
    .delete(protectRoutes, checkActiveUser,allowedTo('manager', 'admin'),deleteCategoryValidator,deletecategory);

export default categoriesRoute