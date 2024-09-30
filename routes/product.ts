import { Router } from "express";
import product from "../models/product";
import { createProduct, deleteProduct, getAllProduct, getProduct, resizeProductImages, updateProduct, uploadProductImages } from "../controllers/product";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utils/validator/productValidator";
import { allowedTo, checkActiveUser, protectRoutes } from "../controllers/auth";




const productRoute: Router = Router()

productRoute.route('/')
    .get(getAllProduct)
    .post(protectRoutes, checkActiveUser,allowedTo('manager', 'admin'),uploadProductImages, resizeProductImages,createProductValidator,createProduct)
    

productRoute.route('/:id')
    .get(getProductValidator,getProduct)
    .put(protectRoutes, checkActiveUser,allowedTo('manager', 'admin'),uploadProductImages, resizeProductImages,updateProductValidator,updateProduct)
    .delete(protectRoutes, checkActiveUser,allowedTo('manager', 'admin'),deleteProductValidator,deleteProduct)

export default productRoute