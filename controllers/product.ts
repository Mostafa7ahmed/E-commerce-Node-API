import { Product } from "../interfaces/product";
import { getAll, createDoc, getOne, UpdateOne, deleteOne } from "./refactorHandling";
import  productSchema  from "../models/product"

import multer from "multer";
import sharp from "sharp";
import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";
import asyncHandler from "express-async-handler"
import {uploadMultiImages} from "../middlewares/uploadImage"

export const uploadProductImages = uploadMultiImages([{ name: 'cover', maxCount: 1 }, { name: 'images', maxCount: 5 }])
export const resizeProductImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // if (req.file) {
    //   const imgName = `product-${Date.now()}.webp`
    //   await sharp(req.file.buffer)
    //     .resize(500, 500)
    //     .toFormat('webp')
    //     .webp({ quality: 95 })
    //     .toFile(`uploads/products/${imgName}`)
    //   req.body.cover = imgName;
    // }
    if (req.files) {
        if (req.files.cover) {
        const imgName = `product-${Date.now()}-cover.webp`
        await sharp(req.files.cover[0].buffer)
            .resize(500, 500)
            .toFormat('webp')
            .webp({ quality: 95 })
            .toFile(`uploads/products/${imgName}`)
        req.body.cover = imgName;
        }
        if (req.files.images) {
        req.body.images = [];
        await Promise.all(req.files.images.map(async (image: any, index: number) => {
            const imgName = `product-${Date.now()}N${index}-.webp`;
            await sharp(image.buffer)
            .toFormat('webp')
            .webp({ quality: 95 })
            .toFile(`uploads/products/${imgName}`);
            req.body.images.push(imgName);
        }))
        }
    }
    next();
    })


export const getAllProduct = getAll<Product>(productSchema, 'product');
export const createProduct = createDoc<Product>(productSchema);
export const getProduct = getOne<Product>(productSchema)
export const updateProduct = UpdateOne<Product>(productSchema)
export const deleteProduct = deleteOne<Product>(productSchema)