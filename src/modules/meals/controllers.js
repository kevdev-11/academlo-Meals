import { catchAsync } from "../../common/errors/catchAsync.js"
import { partialValidateMeals, validateSchemaMeals } from "./schema.js"
import MealsServices from "./services.js"

export const makeMeal = catchAsync(async(req, res, next) => {

    const { id } = req.params;
    const { sessionUser } = req;

    const { hasError, errorMessages, mealsData } = validateSchemaMeals(req.body)

    if(hasError){
        return res.status(422).json({
            status: 'fail-schema',
            message: errorMessages
        })
    };

    const { name, price } = mealsData;

    const createMeal = await MealsServices.createMeal({
        restaurantId: id,
        name,
        price
    })

    console.log(createMeal);

    return res.status(200).json({
        message: 'the meal is created exceptionallly',
        createMeal,
        sessionUser
    });

}); 

export const allMeals = catchAsync(async(req, res, next) => {
    
    const allMeals = await MealsServices.allMeal();

    return res.json(allMeals)

});

export const findMeal = catchAsync(async(req, res, next) => {

    const { meal } = req;

    return res.status(201).json(meal)

});

export const updateMeal = catchAsync(async(req, res, next) => {

    const { meal } = req;

    const {hasError, errorMessages, mealsData } = partialValidateMeals(req.body)
    
    if(hasError){
        
        return res.status(422).json({
            status: 'fail-schema',
            message: errorMessages
        })
    };

    // const { name, price } = mealsData;
    console.log(mealsData);

    const updateMeals = await MealsServices.update(meal, {
        
        name: mealsData.name,
        price: mealsData.price
    });

    return res.status(201).json({
        message: 'updated data meals',
        updateMeals
    })
});
 
export const deleteMeal = catchAsync(async(req, res, next) => {

    const { meal } = req;

    const disableMeal = await MealsServices.delete(meal);

    return res.json(disableMeal);

}) 