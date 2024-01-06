import { catchAsync } from "../../common/errors/catchAsync.js"
import { generateJWT } from "../../config/plugins/generateJWT.js";
import { validateSchema, validateUpdateRestaurant } from "../restaurants/schema.js"
import RestaurantServices from "./services.js";

export const createResto = catchAsync(async (req, res, next) => {

    const { sessionUser } = req;
    console.log(sessionUser);
    
    const { hasError, errorMessages, resData } = validateSchema(req.body);

    if(hasError){
        return res.status(404).json({
            status: 'fail-schema',
            message: errorMessages
        });
    };

    const newRestaurant = await RestaurantServices.createNewResto(resData);
    const token = await generateJWT(newRestaurant.id);

    return res.status(200).json({
        token,
        newRestaurant,
        sessionUser
    });
    
});

export const allResto = catchAsync(async (req, res, next) => {

    const allRestaurants = await RestaurantServices.allRestos();
    // console.log(allRestaurants);

    return res.status(201).json({
        message: 'all restaurants register',
        allRestaurants
    })
});

export const oneResto = catchAsync(async (req, res, next) => {

    const { restaurant } = req;

    return res.status(201).json(restaurant)

});

export const updateResto = catchAsync(async (req, res, next) => {
    
    const { hasError, errorMessages, resData } = validateUpdateRestaurant(req.body);

    if(hasError) {
        return res.status(404).json({
            status: 'fail-schema',
            message: errorMessages
        })
    };

    const { restaurant } = req;

    const updatedRestaurant = await RestaurantServices.updateData(restaurant, {
        name: resData.name,
        address: resData.address
    });

    console.log(updatedRestaurant);

    return res.status(201).json({
        message: 'the updated is functionally',
        restaurant,
        updatedRestaurant
    })
});

export const disableResto = catchAsync(async (req, res, next) => {

    const { restaurant } = req;

    const disabled = await RestaurantServices.disableData(restaurant);

    return res.status(200).json({
        disabled,
        restaurant
    })

});