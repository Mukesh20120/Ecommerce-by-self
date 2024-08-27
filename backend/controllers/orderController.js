const asyncWrapper = require("../middleware/AsyncWrapper");
const customError = require('../errors');
const {Product,Order} = require('../models');
const calcPrices = require('../utils/calPrices')

const addOrderItems = asyncWrapper(async (req, res) => {
  const {orderItems,shippingAddress,paymentMethod} = req.body;
  if(!orderItems || orderItems.length<=0){
    throw new customError.NotFoundError('order Items not found send order item');
  }
  const itemsFromDB = await Product.find({_id: {$in: orderItems.map(x=>x._id)}});
  const dbOrderItems = orderItems.map((itemFromClient) => {
    const matchingItemFromDB = itemsFromDB.find(
      (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
    );
    return {
      ...itemFromClient,
      product: itemFromClient._id,
      price: matchingItemFromDB.price,
      _id: undefined,
    };
  });

  // calculate prices
  const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
    calcPrices(dbOrderItems);

  const order = new Order({
    orderItems: dbOrderItems,
    user: req.user.userId,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});
const getMyOrders = asyncWrapper(async (req, res) => {
  const order = await Order.find({_id: req.user.userId})
  res.json({ success: true,order });
});
const getOrderById = asyncWrapper(async (req, res) => {
  const order = await Order.findById({_id: req.params.id}).populate('user','name email');
  if(!order){
    throw new customError.NotFoundError('order not found provide valid user');
  }
  res.json({ success: true,order });
});
const updateOrderToPaid = asyncWrapper(async (req, res) => {
  res.json({ msg: "updateOrderToPaid order successfully" });
});
const updateOrderToDelivered = asyncWrapper(async (req, res) => {
  res.json({ msg: "updateOrderToDelivered order successfully" });
});
const getOrders = asyncWrapper(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json({ success: true,orders });
});

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};
