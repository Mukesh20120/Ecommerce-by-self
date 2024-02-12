const customApiError = require('./customApiError')
const httpError = require('http-status-codes');

class NotFoundError extends customApiError{
    constructor(message){
        super(message);
        this.statusCode = httpError.NotFoundError;
    }
}

module.exports = NotFoundError;