import { Router } from "express";
import { allowedTo, checkActiveUser, protectRoutes } from "../controllers/auth";
import { createOrderValidator, getOrderValidator } from "../utils/validator/orderVallidator";
import { createCashOrder, deliverOrder, filterOrders, getAllOrders, getOrder, payOrder } from "../controllers/order";


const ordersRoute: Router = Router();
ordersRoute.use(protectRoutes, checkActiveUser)

ordersRoute.route('/')
    .get(filterOrders, getAllOrders)
    .post(allowedTo('user'), createOrderValidator, createCashOrder);

ordersRoute.route('/:id').get(getOrderValidator, getOrder)

ordersRoute.use(allowedTo('manager', 'admin'))
ordersRoute.route('/:id/paid').put(getOrderValidator, payOrder)
ordersRoute.route('/:id/delivered').put(getOrderValidator, deliverOrder)

export default ordersRoute;