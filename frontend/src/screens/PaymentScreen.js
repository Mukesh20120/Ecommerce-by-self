import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPaymentMethod } from "../slices/cartSlice";

export default function PaymentScreen() {

  const [paymentMethod, setPaymentMethod] = useState("paypal")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e)=>{
    e.preventDefault();
    setPaymentMethod(e.target.value);
  }
  console.log(paymentMethod);
  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(addPaymentMethod(paymentMethod));
      navigate('/order')
  };

  return (
    <FormContainer>
      <h2>Payment Method</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <input
            type="radio"
            name="stripe"
            value="paypal"
            id="paypal"
            onChange={(e)=>handleOnChange(e)}
            className=" fs-3"
          />
          <label for="paypal" className=" fs-5">Paypal</label>
        </div>
        <div className="mb-3">
          <input
            type="radio"
            name="stripe"
            value="stripe"
            id="stripe"
            onChange={(e)=>handleOnChange(e)}
            className=" fs-3"
          />
          <label for="stripe" className=" fs-5">Stripe</label>
        </div>
        <div className="mb-3">
          <input
            type="radio"
            name="stripe"
            value="phonePe"
            id="phonePe"
            onChange={(e)=>handleOnChange(e)}
            className=" fs-3"
          />
          <label for="phonePe" className=" fs-5">Phone Pe</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </FormContainer>
  );
}
