import { AppErrors } from "../../../common/errors/appError.js";
import { catchAsync } from "../../../common/errors/catchAsync.js";
import MealsServices from "../services.js";


export const mealValidate = catchAsync(async (req, res, next) => {
    
    const { id } = req.params;
    const meal = await MealsServices.oneMeal(id);
    if(!meal){
        return next(
            new AppErrors('this meal not exist', 404)
        )
    };

    console.log(meal.user.id)

    req.meal = meal;
    next();

});