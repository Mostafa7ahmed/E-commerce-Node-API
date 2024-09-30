import { Application } from "express"
import categoriesRoute from "./categories";
import subcategoryRoute from "./subcategory";
import globalError from "../middlewares/globalError";
import ApiError from "../utils/apiError";
import { Request, Response, NextFunction } from "express";
import productRoute from "./product";
import UsersRoute from "./users";
import authRoute from "./authRoute";
import wishlistRoute from "./wishlistRoute";
import addressRoute from "./addressRoute";
import couponsRoute from "./couponsRoute";
import reviewRoute from "./reviewRoute";
import cartRoute from "./cartRoute";
import ordersRoute from "./orderRoute";



const mountRoute = (app:Application)=>{
    app.use('/api/v1/categories', categoriesRoute);
    app.use('/api/v1/subcategory', subcategoryRoute);
    app.use('/api/v1/product', productRoute);
    app.use('/api/v1/users', UsersRoute);
    app.use('/api/v1/auth', authRoute );
    app.use('/api/v1/carts', cartRoute);
    app.use('/api/v1/orders', ordersRoute);
    app.use('/api/v1/address', addressRoute );
    app.use('/api/v1/review', reviewRoute );
    app.use('/api/v1/wishlist', wishlistRoute);
    app.use('/api/v1/coupon', couponsRoute);
    app.all('*', (req:Request, res:Response, next:NextFunction)=>{
        return next(new ApiError(`This Route ${req.originalUrl} Not Found`, 400))
    });
    app.use(globalError)
}

export default mountRoute