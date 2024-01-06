import jwt from "jsonwebtoken";
// import { Jwt } from "jsonwebtoken";
import { envs } from "../enviroments/enviroments.js";


export const generateJWT = (id) => {
    return new Promise((resolve, reject)=>{
        
        const payload = { id }

        jwt.sign(
            payload,
            envs.SEED_JWT,
            {
                expiresIn: envs.JWT_EXPIRE_IN
            },
            (err, token) => {
                if(err) reject (err)
                resolve(token)
            }
        );
    }); 
};