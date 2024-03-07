import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { addShippingAddress } from "../slices/cartSlice";

export default function ShippingScreen() {
  const shippingAddress = useSelector((state)=>state.cartSlice.shippingAddress);
  const [userData, setUserData] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "",
  });

  const handleOnChange = (e) => {
    setUserData({...userData,[e.target.name]: e.target.value})
  };
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      dispatch(addShippingAddress(userData));
      navigate('/payment');
    }
    catch(error){
      toast.error(error?.data?.msg || 'Invalid credentials');
    }
  };

  return (
    <FormContainer>
      <h2>Shipping Address</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            className="form-control"
            placeholder="Enter your address "
            onChange={(e)=>handleOnChange(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
           type="text"
            name="city"
            value={userData.city}
            className="form-control"
            placeholder="Enter your city"
            onChange={(e)=>handleOnChange(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={userData.postalCode}
            className="form-control"
            placeholder="Enter your Postal Code"
            onChange={(e)=>handleOnChange(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            type="text"
            name="country"
            value={userData.country}
            className="form-control"
            placeholder="Country"
            onChange={(e)=>handleOnChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </FormContainer>
  );
}
