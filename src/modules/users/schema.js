import z from 'zod';
import { extractValidateData } from '../../common/utils/extractErrors.js';

const userSchema = z.object({

    name: z.string()
    .min(2,{message: 'must be more than 2 characters'})
    .max(25,{message: 'must be less than 25 characters'}),
    
    email: z
    .string().email('must be a email address'),

    password: z.string()
    .min(5)
    .max(30),

    // status: z.enum(['available', 'disable']),
    role: z.enum(['normal', 'admin'])
    
});

const loginSchema = z.object({

    email: z
    .string().email('must be a email address'),

    password: z.string()
    .min(5)
    .max(30)

})

const updateSchema = z.object({

    name: z.string()
    .min(2,{message: 'must be more than 2 characters'})
    .max(25,{message: 'must be less than 25 characters'}),

    email: z
    .string().email('must be a email address')

})

export function validateSchema (data){

    const result = userSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data: thisData
    } = extractValidateData(result);

    return { hasError, errorMessages, thisData }
}

export function validateLogin (data){

    const result = loginSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data: thisData
    } = extractValidateData(result);

    return { hasError, errorMessages, thisData }
}

export function validateUpdateData (data){

    const result = updateSchema.partial().safeParse(data);

    const {
        hasError,
        errorMessages,
        data: thisData
    } = extractValidateData(result);

    return { hasError, errorMessages, thisData }
}