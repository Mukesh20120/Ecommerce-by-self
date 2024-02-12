const {Product} = require('../models');
const asyncWrapper = require('../middleware/AsyncWrapper');
const {StatusCodes} = require('http-status-codes');
const customApiError = require('../errors')

const getAllProduct = asyncWrapper(async(req,res) => {
   const products = await Product.find({});
   res.status(StatusCodes.OK).json({products});
})

const getSingleProduct = asyncWrapper(async(req,res)=>{
    const {id: productId} = req.params;
    const product = await Product.findOne({_id: productId});
    if(!product){
        throw new customApiError.BadRequestError('Product not found with this id');
    }
    res.status(StatusCodes.OK).json(product);
})

module.exports = {getAllProduct,getSingleProduct};