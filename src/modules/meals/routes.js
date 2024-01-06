import { Router } from 'express';

import { makeMeal, 
    allMeals, 
    findMeal, 
    updateMeal, 
    deleteMeal } from './controllers.js';
import { mealValidate } from './middlewares/mealById.js';
// import { protect } from '../users/middlewares/protect-routes.js';

export const router = Router();

router.get('/', allMeals);
router.get('/:id', mealValidate, findMeal);

// router.use(protect)

router.route('/:id')
.post(makeMeal)
.patch(mealValidate, updateMeal)
.delete(mealValidate, deleteMeal)