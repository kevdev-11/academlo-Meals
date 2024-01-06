import { AppErrors } from "../../../common/errors/appError.js";
import { catchAsync } from "../../../common/errors/catchAsync.js";
import OrderServices from "../services.js";

export const validateIdOrder = catchAsync(async(req, res, next) => {

    const { id } = req.params;

    const order = await OrderServices.findOneOrder(id);

    if(!order){
        return next(new AppErrors('not find this order with the active status', 404))
    }

    req.order = order;
    next()
});