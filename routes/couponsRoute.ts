import { Router } from "express";
import { allowedTo, checkActiveUser, protectRoutes } from "../controllers/auth";
import { createCoupons, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "../controllers/coupons";
import { createCouponValidator, deleteCouponValidator, getCouponValidator, updateCouponValidator } from "../utils/validator/couponsValidator";



const couponsRoute:Router = Router();

couponsRoute.use(protectRoutes, checkActiveUser, allowedTo('manager', 'admin'));
couponsRoute.route('/')
    .get(getAllCoupons)
    .post(createCouponValidator, createCoupons);
couponsRoute.route('/:id')
    .get(getCouponValidator, getCoupon)
    .put(updateCouponValidator, updateCoupon)
    .delete(deleteCouponValidator, deleteCoupon);

export default couponsRoute;
