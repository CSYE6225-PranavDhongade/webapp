exports.successResponse = async (response, statusCode, message) => {
    return response.status(statusCode).json(message);
};

exports.failureResponse = async (response, statusCode, message) => {
    return response.status(statusCode).json(message);
};