import React from "react";
import { GiCrossMark } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  return (
    <nav className="bg-info d-flex align-items-center justify-content-between px-md-4">
      <div className="ms-md-3 p-md-3 d-flex align-items-center gap-3">
        <GiCrossMark size={40} aria-label="Logo" />
        <h1 className="text-decoration-underline text-uppercase fw-bolder">
          Logo
        </h1>
      </div>
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
        <div
          className="d-flex align-items-center gap-1"
          style={{ cursor: "pointer" }}
          onClick={() => {}}
        >
          <FaShoppingCart size={25} aria-label="Shopping Cart" />
          <span className="text-uppercase">Cart</span>
        </div>
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
