import { envs } from "../../config/enviroments/enviroments.js";
import { AppErrors } from "./appError.js";
import { Errors } from "./errorModel.js";


const Error23503 = () => {
    
    return new AppErrors('the id of element is not present in the database', 400)
}
const Error23505 = () => {
    
    return new AppErrors('email is duplicated or same, please set another', 400)
}

const Error22P02 = () => {
    
    return new AppErrors('data validation is wrong, something with your set data', 400)
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = async (err, res) => {
    
    await Errors.create({
        status: err.status,
        message: err.message,
        stack: err.stack
    });

    if(err.isOperational === true){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }else{
        console.error("ERROR", err);
        res.status(500).json({
            status: 'failure',
            message: 'something wrong on server side'
        })
    }
}

export const globalHandleError = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    if(envs.DEV_ENV === 'development'){
        sendErrorDev(err, res)
    }

    if(envs.DEV_ENV === 'PRODUCTION'){
        let error = {err};
        if(err.parent?.code === '23505') error = Error23505();
        if(err.parent?.code === '23503') error = Error23503();
        if(err.parent?.code === '22P02') error = Error22P02();
        sendErrorProd(error, res)
    }

    next();
}