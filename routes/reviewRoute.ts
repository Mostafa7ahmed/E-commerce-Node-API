import { Router } from "express";
import { CreateReview, deleteReview, filterReviews, getAllReviews, getReview, setProductAndUserId, updateReview } from "../controllers/review";
import { allowedTo, checkActiveUser, protectRoutes } from "../controllers/auth";
import { CreateReviewValidator, deleteReviewValidator, updateReviewValidator } from "../utils/validator/reviewValidator";


const  reviewRoute:Router = Router({mergeParams:true});
reviewRoute.route('/')
    .get(filterReviews,getAllReviews)
    .post(protectRoutes, checkActiveUser, allowedTo('user'), setProductAndUserId, CreateReviewValidator,CreateReview);

reviewRoute.route('/:id')
    .get(getReview, getReview)
    .put(protectRoutes, checkActiveUser, allowedTo('user'), updateReviewValidator, updateReview)
    .delete(protectRoutes, checkActiveUser, deleteReviewValidator, deleteReview);

export default reviewRoute;
