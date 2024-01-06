import { AppErrors } from "../../../common/errors/appError.js";
import { catchAsync } from "../../../common/errors/catchAsync.js";
import ReviewServices from "../../reviews/services.js";
import RestaurantServices from "../services.js";

export const restaurantExist = catchAsync( async(req, res, next) => {

    const { id, restaurantId } = req.params;

    let restId = restaurantId || id;

    const restaurant = await RestaurantServices.oneResto(restId);

    if(!restaurant){
        return next(
            new AppErrors(`this restaurant not exist or has been disable`, 401)
        )
    };

    req.restaurant = restaurant;
    next()

});

export const validateReview = catchAsync(async (req, res, next) => {
    
    const { id } = req.params;
    const review = await ReviewServices.findOneReview(id);
    if(!review){
        return next(
            new AppErrors('review not found', 404)
        )
    };

    console.log(review.user.id)

    req.review = review;
    req.user = review.user;
    next()
});