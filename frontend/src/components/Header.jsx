import React from "react";
import { GiCrossMark } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const cartData = useSelector((state)=>state.cartSlice);
  const {cartItems} = cartData;
  return (
    <nav className="bg-info d-flex align-items-center justify-content-between px-md-4">
      <Link to={'/'} className="ms-md-3 p-md-3 d-flex align-items-center gap-3 text-decoration-none ">
        <GiCrossMark size={40} aria-label="Logo" />
        <h1 className="text-decoration-underline text-uppercase fw-bolder">
          Logo
        </h1>
      </Link>
      <div className="d-flex gap-3">
        <div className="d-flex gap-1">
          <input
            className="rounded-2 border-0 px-2"
            placeholder="Search item here"
          />
          <a className="text-uppercase btn btn-dark" href="/">
            Search
          </a>
        </div>
        <Link to={"/cart"} className="text-decoration-none">
          <div
            className="d-flex align-items-center gap-1"
            style={{ cursor: "pointer" }}
          >
            {cartItems && <sup className="text-black fw-bolder fs-5">{`${cartItems.reduce((acc,item)=>acc+item.qty,0)}`}</sup>}
            <FaShoppingCart size={25} aria-label="Shopping Cart" color="black"/>
            <span className="text-uppercase text-black ">Cart</span>
          </div>
        </Link>
        <div
          className="d-flex align-items-center gap-1"
          style={{ cursor: "pointer" }}
        >
          <CgProfile size={25} aria-label="User Profile" />
          <span className="text-uppercase">Sign In</span>
        </div>
      </div>
    </nav>
  );
}
