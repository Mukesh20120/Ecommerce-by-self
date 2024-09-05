import React from "react";
import { GiCrossMark } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useLogoutMutation } from "../slices/userApiSlice";
import { logOut } from "../slices/authSlice";
import { toast } from "react-toastify";


export default function Header() {
  const cartData = useSelector((state) => state.cartSlice);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = cartData;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async() =>{
    try{
     const res = await logout().unwrap();
     toast.success(res.message);
     navigate('/login');
     dispatch(logOut());
    }catch(error){
     toast.error(error.message);
    }
  }

  return (
    <nav className="bg-info d-flex align-items-center justify-content-between px-md-4">
      <Link
        to={"/"}
        className="ms-md-3 p-md-3 d-flex align-items-center gap-3 text-decoration-none "
      >
        <GiCrossMark size={40} aria-label="Logo" />
        <h1 className="text-decoration-underline text-uppercase fw-bolder">
          Shoplicity
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
            {cartItems && (
              <sup className="text-black fw-bolder fs-5">{`${cartItems.reduce(
                (acc, item) => acc + item.qty,
                0
              )}`}</sup>
            )}
            <FaShoppingCart
              size={25}
              aria-label="Shopping Cart"
              color="black"
            />
            <span className="text-uppercase text-black ">Cart</span>
          </div>
        </Link>
        <div
          className="d-flex align-items-center gap-1"
          style={{ cursor: "pointer" }}
        >
          <CgProfile size={25} aria-label="User Profile" />
          {!userInfo ? (
            <Link to={"/login"}>
              <span className="text-uppercase">Sign In</span>
            </Link>
          ) : (
            <>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle text-uppercase "
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 {userInfo.name}
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item">
                     Profile
                    </Link>
                  </li>
                  <li>
                    <p class="dropdown-item" onClick={()=>handleLogout()}>
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
