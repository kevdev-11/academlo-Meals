import { AppErrors } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js"
import MealsServices from "../meals/services.js";
import OrderServices from "./services.js";

export const createdOrder = catchAsync(async (req, res, next) => {
    
    const { quantity, totalPrice, mealId } = req.body;
    
    let ident = mealId || id

    const mealOrder = await MealsServices.oneMeal(ident);
    console.log(mealOrder);

    if(!mealOrder){
        return next(new AppErrors(`the ${ident} does not exist`, 404))
    }

    const priceOrder = mealOrder.price;
    // console.log(priceOrder)
    if(quantity>=1){
        totalPrice = priceOrder * quantity;
        return totalPrice
    }

    const orderCreated = await OrderServices.createTo({
        mealId: mealOrder,
        quantity,
        priceOrder,
        totalPrice
    }); 

    return res.status(201).json({
        message: 'order is created successfully',
        orderCreated
    })

});

export const allOrders = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    console.log(sessionUser)
    const ordersByUser = await OrderServices.findAll()

    return res.json(ordersByUser);

});

export const completed = catchAsync(async (req, res, next) => {

    const { order } = req;

    const completed = await OrderServices.completedOrder(order)

    return res.status(201).json({
        message: 'the order has been actualized to completed',
        completed
    })
});

export const cancelled = catchAsync(async (req, res, next) => {

    const { order } = req;

    const cancelled = await OrderServices.cancelledOrder(order)

    return res.status(201).json({
        message: 'the order has been actualized to cancelled',
        cancelled
    })
})