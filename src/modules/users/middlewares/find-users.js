import { AppErrors } from "../../../common/errors/appError.js";
import { catchAsync } from "../../../common/errors/catchAsync.js";
import { UserServices } from "../services.js";

const validateUserById = catchAsync(async(req, res, next) => {

    const { id } = req.params;

    const user = await UserServices.findOneUser(id);

    console.log(user);

    if(!user){
        // return new AppErrors(`the user ${id} cannot be found`, 404); 
        return next(new AppErrors(`the user ${id} cannot be found`, 404)) 
    };

    req.user = user;
    next()
});

export default validateUserById;