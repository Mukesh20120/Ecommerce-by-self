import React, { useEffect } from "react";
import { useSelector,useDispatch} from "react-redux";
import {useNavigation} from "react-router-dom"
import {useCreateOrderMutation} from "../slices/orderApiSlice"
import { clearCartItems } from "../slices/cartSlice";

export default function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cartSlice);
  const address = Object.values(cart.shippingAddress).join(" ");
  const { cartItems,paymentMethod } = cart;
  const navigate = useNavigation();
  useEffect(()=>{
    if(!address || !paymentMethod){
      navigate('/shipping')
    }
  },[address,paymentMethod,navigate])
  const [createOrder,{isLoading,isError}] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const placeOrderHandler =async () =>{
      try{
        const res = await createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        }).unwrap;
       dispatch(clearCartItems());
       navigate(`order/${res._id}`);
      }
      catch(error){
        if(error && error.response && error.response.data)
          console.log(error.response.data.msg);
        else
          console.log(error);
      }
  }
  return (
    <>
    {isLoading ? (
      <>
        <p>loading...</p>
      </>
    ) : isError ? (
      <>{isError.message}</>
    ) : (
      <>
    <div className=" container ">
      <div className="row">
        <div className="col-8">
          <div>
            <h4>Shipping Address</h4>
            <p>
              <span>Address: </span>
              {address}
            </p>
          </div>
          <div>
            <h4>Payment Method</h4>
            <p>
              <span>Method: </span>
              {cart.paymentMethod}
            </p>
          </div>
          <div>
            <h2>Order Items</h2>
            <div>
              {cartItems.map((item) => {
                return (
                  <div className=" d-flex align-items-center gap-3 border-bottom  ">
                    <div style={{ width: "10%", height: "10%" }}>
                      <img
                        src={require("../components" + item.image)}
                        className="card-img-top"
                        alt="product"
                      />
                    </div>
                    <h5>{item.name}</h5>
                    <div>
                      <p>
                        {item.qty}X{item.price}={item.qty * item.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-4">
          <h3 className="border-bottom">Order Summary</h3>
          <table className=" table ">
            <tbody>
              <tr>
                <td>Item</td>
                <td>
                ₹{cart?.itemPrice !== undefined ? cart.itemPrice : "0.00"}
                </td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>
                ₹{cart?.shippingPrice !== undefined ? cart.shippingPrice : 0.0}
                </td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>₹{cart.taxPrice}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>₹{cart.totalPrice}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={placeOrderHandler}>Place Order</button>
        </div>
      </div>
    </div>
    </>
      )}
    </>
  );
}
