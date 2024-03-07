import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useLoginMutation} from '../slices/userApiSlice'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setAuthCredentials} from '../slices/authSlice';
import { toast } from 'react-toastify';

export default function LoginScreen() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    setUserData({...userData,[e.target.name]: e.target.value})
  };
  const [login] = useLoginMutation();
  const {userInfo} = useSelector((state)=>state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/'

  useEffect(()=>{
    if(userInfo){
       navigate(redirect);
    }
  },[navigate,userInfo,redirect]);

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      console.log("submit",userData);
      const res = await login(userData).unwrap();
      dispatch(setAuthCredentials({...res}));
      navigate(redirect);
    }
    catch(error){
      toast.error(error?.data?.msg || 'Invalid credentials');
    }
  };
  return (
    <FormContainer>
      <h2>Sign In</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="mt-3">
        <p>Don't have account ?<Link to={'/register'} className=" text-decoration-none ">Create new account</Link></p>
      </div>
    </FormContainer>
  );
}
