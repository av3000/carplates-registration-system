function errorHandler(error, request, response, next) {
    return response.status(error.status || 500).json({
        error: {
            message: error.message || "Something went wrong..."
        },
        body: request.body
    });
};

module.exports = errorHandler;