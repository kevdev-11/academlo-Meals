import express from 'express';
import { routerUser as userRouter } from '../modules/users/routes.js';
import { router as restoRouter } from '../modules/restaurants/routes.js';
import { reviewsRouter } from '../modules/reviews/routes.js';
import { router as mealRouter } from '../modules/meals/routes.js';
// import { router as orderRouter } from '../modules/orders/routes.js';

export const router = express.Router();

router.use('/meals', mealRouter)
router.use('/users', userRouter)
// router.use('/orders', orderRouter)
router.use('/restaurants', restoRouter)
router.use('/restaurants/reviews', reviewsRouter )