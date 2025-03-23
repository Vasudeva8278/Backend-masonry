class ErrorHandler extends Error {
    constructor(statusCode, message = "Something went wrong", error = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.error = error;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

const errorHandler = (res, message, statusCode) => {
    const error = new ErrorHandler(statusCode, message);
    res.status(statusCode).json({
        success: error.success,
        statusCode: error.statusCode,
        message: error.message,
        error: error.error,
    });
};

export { errorHandler, ErrorHandler };
