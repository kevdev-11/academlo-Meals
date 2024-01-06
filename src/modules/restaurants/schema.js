import z from 'zod';
import { extractValidateData } from '../../common/utils/extractErrors.js';

const restoSchema = z.object({

    name: z.string()
    .min(5)
    .max(50),

    address: z.string()
    .min(7)
    .max(50),

    rating: z.number()
    .min(1)
    .max(5)
});

const updatedResSchema = z.object({

    name: z.string()
    .min(5)
    .max(50),

    address: z.string()
    .min(7)
    .max(50)

})

export function validateSchema(data){

    const result = restoSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data: resData
    } = extractValidateData(result)

    return {resData, errorMessages, hasError}
}

export function validateUpdateRestaurant(data){

    const result = updatedResSchema.partial().safeParse(data);

    const {
        hasError,
        errorMessages,
        data: resData
    } = extractValidateData(result)

    return {resData, errorMessages, hasError}
}