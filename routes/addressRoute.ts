import { Router } from "express";
import { allowedTo, checkActiveUser, protectRoutes } from "../controllers/auth";
import { addAddress, deleteAddress, getUserAddress } from "../controllers/address";
import { addAddressValidator, removeAddressValidator } from "../utils/validator/addressValidator";




const addressRoute: Router = Router();
addressRoute.use(protectRoutes, checkActiveUser, allowedTo('user'));
addressRoute.route('/')
    .get(getUserAddress)
    .post(addAddressValidator, addAddress);

    addressRoute.route('/:addressId')
    .delete(removeAddressValidator,deleteAddress);
export default addressRoute;