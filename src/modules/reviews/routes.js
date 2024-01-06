import { Router } from "express";
import { newReview, updateReview, deleteReview } from './controllers.js'
import { restaurantExist, validateReview } from "../restaurants/middlewares/find-resto.js";
import { protect, protectAccountOwner } from "../users/middlewares/protect-routes.js";

export const reviewsRouter = Router();

reviewsRouter.use(protect)

reviewsRouter.post('/:id', restaurantExist, validateReview, newReview )

reviewsRouter.patch('/:restaurantId/:id', 
restaurantExist, 
validateReview, 
protectAccountOwner, 
updateReview );

reviewsRouter.delete('/:restaurantId/:id', 
restaurantExist, 
validateReview, 
protectAccountOwner, 
deleteReview )