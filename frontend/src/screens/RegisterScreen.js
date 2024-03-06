import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";

export default function RegisterScreen() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleOnChange = (e) => {
    setUserData({...userData,[e.target.name]: e.target.value})
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit",userData);
  };
  return (
    <FormContainer>
      <h2>Register</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            className="form-control"
            placeholder="Enter your name "
            onChange={(e)=>handleOnChange(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            className="form-control"
            placeholder="Enter your Email address"
            onChange={(e)=>handleOnChange(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            className="form-control"
            placeholder="Enter your password"
            onChange={(e)=>handleOnChange(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            className="form-control"
            placeholder="Confirm password"
            onChange={(e)=>handleOnChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="mt-3">
        <p>Already have account ?<Link to={'/login'} className=" text-decoration-none ">Sign in</Link></p>
      </div>
    </FormContainer>
  );
}
