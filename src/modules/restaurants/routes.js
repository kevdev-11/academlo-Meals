import { protect, restrict } from '../users/middlewares/protect-routes.js';
import { createResto, allResto, oneResto, updateResto, disableResto } from './controllers.js'
import { restaurantExist } from './middlewares/find-resto.js'
import { Router } from 'express';

export const router = Router();


router.get('/', allResto);
router.get('/:id', restaurantExist, oneResto)

router.use(protect)

router.post('/',restrict("admin"), createResto);

router.route('/:id')
.patch(restrict('admin'), restaurantExist, updateResto)
.delete(restrict('admin'), restaurantExist, disableResto)