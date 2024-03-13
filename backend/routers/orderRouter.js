const {addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrders} = require('../controllers/orderController')
const router = require('express').Router();

const {protected,verifyAdmin} = require('../middleware/Authentication')

router.route('/').post(protected,addOrderItems).get(protected,verifyAdmin,getOrders);
router.route('/mine').get(protected,getMyOrders);
router.route('/:id').get(protected,getOrderById);
router.route('/:id/pay').put(protected,updateOrderToPaid);
router.route('/:id/deliver').put(protected,updateOrderToDelivered);

module.exports = router;