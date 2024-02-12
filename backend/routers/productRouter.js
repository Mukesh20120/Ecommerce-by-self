const router = require('express').Router();
const {getAllProduct,getSingleProduct} = require('../controllers/productController');

router.route('/').get(getAllProduct);
router.route('/:id').get(getSingleProduct);

module.exports = router