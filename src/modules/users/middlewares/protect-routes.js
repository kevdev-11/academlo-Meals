import jwt from 'jsonwebtoken';
import { envs } from '../../../config/enviroments/enviroments.js';
import { UserServices } from '../services.js';
import { catchAsync } from '../../../common/errors/catchAsync.js';
import { AppErrors } from '../../../common/errors/appError.js';
import {promisify} from 'util';

export const protect = catchAsync(async (req, res, next ) => {
    let token;

    if( req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) 
    {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token){
        return next(new AppErrors('you are not logged in! TOKEN is not valid', 401));
    }

    const decoded = await promisify(jwt.verify)(token, envs.SEED_JWT);

    const user = UserServices.findOneUser(decoded.id) // revisar
    
    if(!user){
        return next(
            new AppErrors('the owner of this TOKEN is not available', 401)
        );
    };

    req.sessionUser = user;
    next()
});

export const protectAccountOwner = catchAsync(async(req, res, next) => {
    
    const {user, sessionUser} = req;
    console.log(user);
    console.log(sessionUser);
    
    if(user.id !== sessionUser.id && sessionUser === true) {
        return next(new AppErrors('you do not own this account', 401))
    }

    next();
});

export const restrict = (roles) => {
    
    return (req, res, next) => {
        if(roles.includes(req.sessionUser.role)) {
            return next(
                new AppErrors('you are not authorized to this access', 403)
            )
        }
        next();
    };
    
}