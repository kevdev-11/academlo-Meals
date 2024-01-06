// import { Router } from "express";
import express from 'express';

import { allOrders, disableUser, login, oneOrder, signup, updateUser } from "./controllers.js";
import validateUserById from './middlewares/find-users.js';
import { protect, protectAccountOwner } from './middlewares/protect-routes.js';

export const routerUser = express.Router();

routerUser.post('/login', login);

routerUser.post('/signup', signup);

routerUser.use(protect)

routerUser.route('/:id')
.patch(validateUserById, protectAccountOwner, updateUser)
.delete(validateUserById, protectAccountOwner, disableUser);

routerUser.get('/orders', allOrders);
routerUser.get('/orders/:id', oneOrder);