import { Router } from "express";
import { allowedTo, checkActiveUser, protectRoutes } from "../controllers/auth";
import { addProductToCart, applyCoupon, deleteUserCart, getUserCart, removeProductFromCart, updateProductQuantity } from "../controllers/carts";
import { addProductToCartValidator, removeProductFromCartValidator, updateProductQuantityValidator } from "../utils/validator/cartValidator";

const cartRoute: Router = Router()
cartRoute.use(protectRoutes, checkActiveUser, allowedTo('user'))
cartRoute.route('/')
    .get(getUserCart)
    .post(addProductToCartValidator, addProductToCart)
    .delete(deleteUserCart);
cartRoute.put('/applyCoupon', applyCoupon)
cartRoute.route('/:itemId')
    .put(updateProductQuantityValidator, updateProductQuantity)
    .delete(removeProductFromCartValidator, removeProductFromCart);

export default cartRoute;