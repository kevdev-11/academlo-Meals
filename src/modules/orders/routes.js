import { Router } from 'express';

import { createdOrder, allOrders, completed, cancelled } from './controllers.js';
import { validateIdOrder } from './middleware/statusOrder.js';

export const router = Router();

router.post('/', createdOrder)

router.get('/me', allOrders)

router.patch('/:id',validateIdOrder, completed)

router.delete(':/id',validateIdOrder, cancelled)