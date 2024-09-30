import { Router } from "express";
import { changeUserPassword, createUser, deleteUser, getAllUsers, getUser, resizeUserImage, updateUser, uploadUserImage } from "../controllers/users";
import { createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from "../utils/validator/userValidator";
import { allowedTo, checkActiveUser, protectRoutes } from "../controllers/auth";




const UsersRoute: Router = Router();


UsersRoute.route('/')
    .get(getAllUsers)
    .post(uploadUserImage, resizeUserImage,createUserValidator,createUser)

UsersRoute.route('/:id')
    .get(getUserValidator,getUser)
    .put (protectRoutes, checkActiveUser,allowedTo('manager'),uploadUserImage, resizeUserImage,updateUserValidator,updateUser)
    .delete(protectRoutes, checkActiveUser,allowedTo('manager'),deleteUserValidator,deleteUser)
UsersRoute.put('/:id/changePassword', changeUserPassword)

export default UsersRoute;