const {StatusCodes} = require('http-status-codes');

const errorHandlerMiddleware = (err,req,res,next) => {
     let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'something went wrong try again later'
     };
     if(err.name === 'ValidationError'){
        customError.message = Object.values(err.errors).map((item)=>item.message).join(',');
        customError.statusCode = 400
     }
     if(err && err.code === 110000){
        customError.message = `Duplicate value of these ${Object.keys(err.keyValue)} field`;
        customError.statusCode = 400
     }
     if(err.name === 'CaseError'){
        customError.message = `no item found with this ${err.value}`;
        customError.statusCode = 400
     }
     res.status(customError.statusCode).json({msg: customError.message});
}

module.exports = errorHandlerMiddleware;

