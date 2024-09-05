import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

export default function CartItem({ product }) {
  console.log(product);
  const dispatch = useDispatch();
  const handleAddToCart = async (qty) => {
    const item = { ...product, qty };
    dispatch(addToCart({ item }));
  };
  const handleRemoveFromCart = async () => {
    dispatch(removeFromCart({ id: product._id }));
  };
  return (
    <div className="d-flex gap-5 align-items-center shadow-lg justify-content-between">
      <div style={{ height: 100, width: 100 }}>
        <img
          src={require(`../components${
            product?.image || "/images/airpods.jpg"
          }`)}
          alt="cart item img"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div>
        <h5>{product?.name || ""}</h5>
      </div>
      <div>
        <span>₹{product?.price || ""}</span>
      </div>
      <div className="flex-1">
        <select
          name="qty"
          value={product.qty}
          onChange={(e) => {
            handleAddToCart(Number(e.target.value));
          }}
        >
          {[...Array(product?.countInStock || 0).keys()].map((i) => (
            <option value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>
      <div
        onClick={() => {
          handleRemoveFromCart();
        }}
      >
        <MdDelete size={30} />
      </div>
    </div>
  );
}
