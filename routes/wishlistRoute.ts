import { Router } from "express";
import { allowedTo, checkActiveUser, protectRoutes } from "../controllers/auth";
import { addProductToWishList, deleteProductFromWishList, getAllWishList } from "../controllers/wishlist";
import { addToWishlistValidator, removeFromWishlistValidator } from "../utils/validator/wishlistValidator";




const wishlistRoute: Router = Router();
wishlistRoute.use(protectRoutes, checkActiveUser, allowedTo('user'));
wishlistRoute.route('/')
    .get(getAllWishList)
    .post(addToWishlistValidator,addProductToWishList);

wishlistRoute.route('/:productId')
    .delete(removeFromWishlistValidator,deleteProductFromWishList);

export default wishlistRoute;