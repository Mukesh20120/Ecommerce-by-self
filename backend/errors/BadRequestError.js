const customApiError = require('./customApiError');
const httpError = require('http-status-codes')

class BadRequestError extends customApiError{
   constructor(message){
    super(message);
    this.statusCode = httpError.BadRequestError
   }
}
module.exports = BadRequestError;