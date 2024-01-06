import { AppErrors } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { verifyPassword } from "../../config/plugins/encrypted-password.js";
import { generateJWT } from "../../config/plugins/generateJWT.js";
import { validateLogin, validateSchema, validateUpdateData } from "./schema.js";
import { UserServices } from "./services.js";

export const signup = catchAsync( async(req, res, next) => {
    
    const { hasError, errorMessages, thisData } = validateSchema(req.body);

    if(hasError){
        return res.status(404).json({
            status: 'fail validation',
            message: errorMessages
        });
    }

    const { name, password, email, role } = thisData;

    const user = await UserServices.create({
        name,
        password,
        email,
        role
    });

    const token = await generateJWT(user.id);

    return await res.status(201).json({
        message: 'result is OK',
        token,
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        }
    })
});  

export const login = catchAsync(async (req, res, next) => {

    const { hasError, errorMessages, thisData } = validateLogin(req.body);

    if(hasError){
        return res.status(404).json({
            status: 'fail validation',
            message: errorMessages
        });
    }
    // const { data } = req.body;
    // const { email, password } = req.body;

    const userByEmail = await UserServices.findOneByEmail(thisData.email);
    console.log(userByEmail);

    if(!userByEmail){
        return next(new AppErrors('user not exist', 401))
    };

    const isCorrectPass = await verifyPassword(thisData.password, userByEmail.password);

    if(!isCorrectPass){
        return next(new AppErrors('invalid pass to access', 401))
    };

    const token = await generateJWT(userByEmail.id);

    return res.status(201).json({
        token,
        userByEmail
    })

})  

export const updateUser = catchAsync(async (req, res, next) => {

    const { hasError, errorMessages, thisData} = validateUpdateData(req.body)
    
    if(hasError){
        return res.status(404).json({
            status: 'fail validation',
            message: errorMessages
        });
    }

    const { user, sessionUser } = req;
    // const { id } = req.params;
    // const user = await UserServices.findOneUser(id);
    // console.log(user);

    const updateUser = await UserServices.updateUser(user, {
        name: thisData.name,
        email: thisData.email
    });

    return res.status(201).json({
        message: 'is data updated OK',
        sessionUser,
        updateUser
    })
})  

export const disableUser = catchAsync(async(req, res, next) => {

    const { user } = req;

    const deleted = await UserServices.disableUser(user);

    return res.status(201).json({
        message: `the user with id:${user.id} has been eliminated`,
        deleted
    })

});

export const allOrders = catchAsync(async(req, res, next) => {
    
    
    await UserServices.ordersAll();

    return res.status(200).json({
        message: 'this is the GET route, all right'
    })
})  

export const oneOrder = catchAsync( async (req, res, next) => {

    const { id } = req.params;

    const orderFound = await UserServices.orderByUser(id);

    if(!orderFound){
        return res.status(404).json({
            status: 'fail',
            message:'order does not exist by user id'
        })
    };

    
})  