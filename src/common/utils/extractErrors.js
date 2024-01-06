export const extractValidateData = (result) => {
    
    let data;
    let errorMessages;
    const hasError = !result.success;

    if(hasError) errorMessages = JSON.parse(result.error.message);
    if(!hasError) data = result.data;

    return {data, errorMessages, hasError};
}