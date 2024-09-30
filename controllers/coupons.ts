import Coupons from "../interfaces/coupons";
import couponsModel from "../models/couponsModel";
import { createDoc, deleteOne, getAll, getOne, UpdateOne } from "./refactorHandling";



export const getAllCoupons = getAll<Coupons>(couponsModel, 'coupons')
export const createCoupons = createDoc<Coupons>(couponsModel);
export const getCoupon = getOne<Coupons>(couponsModel);
export const updateCoupon = UpdateOne<Coupons>(couponsModel);
export const deleteCoupon = deleteOne<Coupons>(couponsModel);