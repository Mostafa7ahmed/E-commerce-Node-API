import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from "express";
import { FilterData } from "../interfaces/filterData";
import cartsModel from "../models/cartsModel";
import { CartItems } from "../interfaces/cart";
import { getAll, getOne } from './refactorHandling';
import { Orders } from '../interfaces/order';
import orderModel from '../models/orderModel';
import ApiError from '../utils/apiError';
import product from '../models/product';


// filter orders if user role === user
export const filterOrders = asyncHandler((req: Request, res: Response, next: NextFunction) => {
    const filterData: FilterData = {};
    if (req.user?.role === 'user') { filterData.user = req.user._id };
    next();
});

// get all orders
export const getAllOrders = getAll<Orders>(orderModel, 'orders');
// get one order
export const getOrder = getOne<Orders>(orderModel)

/* create order
1- set tax price
2- get user cart
3- check if user has cart
4- create order and set in order (cartItems, totalPrice, userAddress, taxPrice, userId)
5- update products quantity and sold in cartItems using bulkWrite
6- delete user cart
*/
export const createCashOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const taxPrice: number = 100;
    const cart: any = await cartsModel.findOne({ user: req.user?._id });
    if (!cart) { return next(new ApiError("you don't have cart to checkout", 400)) };
    const order = await orderModel.create({
        items: cart.items,
        taxPrice,
        totalPrice: cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice,
        address: req.body.address,
        user: req.user?._id
    });
    const bulkOption = cart.items.map((item: CartItems) => ({
        updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
        },
    }))
    await product.bulkWrite(bulkOption);
    await cartsModel.deleteOne({ user: req.user?._id });
    res.status(200).json({ data: order })
});

// update order paid
export const payOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const order = await orderModel.findByIdAndUpdate(req.params.id, {
        isPaid: true,
        paidAt: Date.now()
    }, { new: true })
    res.status(200).json({ data: order })
});

// update order delivered
export const deliverOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const order = await orderModel.findByIdAndUpdate(req.params.id, {
        isDelivered: true,
        deliveredAt: Date.now()
    }, { new: true })
    res.status(200).json({ data: order })
});