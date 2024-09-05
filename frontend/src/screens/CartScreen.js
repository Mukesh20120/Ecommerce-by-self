import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link, useNavigate } from "react-router-dom";

export default function CartScreen() {
  const cartData = useSelector((state) => state.cartSlice);
  const { cartItems } = cartData;
  const navigate = useNavigate();
  console.log(cartData);
  return (
    <>
      {cartItems.length === 0 ? (
        <>
          <div>
            <p>Cart is empty </p>
            <Link to="/">Go back</Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <h2>Shopping Cart</h2>
          </div>
          <div className="d-flex gap-5">
            <div style={{ flex: 2 }}>
              {cartItems.map((item) => (
                <div className="my-4">
                  <CartItem product={item} />
                </div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div>
                <h3>
                  SubTotal{" "}
                  <span>{`(${cartItems.reduce(
                    (acc, item) => acc + item.qty,
                    0
                  )})`}</span>{" "}
                  items
                </h3>
              </div>
              <div>
                <h5>Total Amount ₹{cartData?.totalPrice || ""}</h5>
              </div>
              <button className="btn btn-dark flex-1"
              onClick={()=>{navigate('/login?redirect=/shipping')}}>
                Proceed to checkout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
