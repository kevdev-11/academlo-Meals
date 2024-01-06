import z from 'zod';
import { extractValidateData } from '../../common/utils/extractErrors.js';

const mealSchema = z.object({

    name: z.string(),
    
    price: z.number()
});

const partialSchema = z.object({

    name: z.string(),
    
    price: z.number()

});

export const validateSchemaMeals = (data) => {

    const result = mealSchema.safeParse(data);

    const { hasError, 
        errorMessages, 
        data: mealsData 
    } = extractValidateData(result);

    return { hasError, errorMessages, mealsData }

}

export const partialValidateMeals = (data) => {

    const result = mealSchema.partial().safeParse(data);

    const { hasError, 
        errorMessages, 
        data: mealsData 
    } = extractValidateData(result);

    return { hasError, errorMessages, mealsData }

}