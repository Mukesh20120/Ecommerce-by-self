const customApiError = require('./customApiError');
const {StatusCodes} = require('http-status-codes');

class UnauthorizedError extends customApiError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
module.exports = UnauthorizedError;