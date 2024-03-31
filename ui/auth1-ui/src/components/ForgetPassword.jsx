import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ForgetPassword = () => {

    const [userData, setUserData] = useState({
        email: "",
        newPassword: ""
    });
    const handleEmail = (e) => {
        setUserData(prev => ({...prev, email: e.target.value}))
    };
    const handlePassword = (e) => {
        setUserData(prev => ({...prev, newPassword: e.target.value}))
    };
    const handleForgetPassword = () => {
        changePassword();
    };
    const navigate = useNavigate();
    const changePassword = async() => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/users/forgetpassword", userData)
            if(response.status === 200){
                alert("Password changed successfully");
                navigate("/");
                return 
            }
        } catch (error) {
            console.log(error);
        }
        
    };
  return (
    <section className="flex flex-col justify-center place-items-center mt-20">
      <div>Forget Password</div>
      <dl>
        <dt>Email</dt>
        <dd><input type="text" 
            className="text-black" placeholder="Your Email"
            onChange={handleEmail} /></dd>  
        <dt>New Password</dt>
        <dd><input type="password" 
            className="text-black" placeholder="Your New Password"
            onChange={handlePassword} /></dd>
      </dl>    
      <button 
        className="bg-[#DB1A5A] w-44 mt-5"
        onClick={handleForgetPassword}>Confirm</button>
      {/* {error} */}
      <div className="flex justify-center place-items-center mt-10">
        <Link to="/forgetpassword">
          <span className="ml-2 text-[12px]">Forget Password?</span>
        </Link>
        <span className="ml-2 ">|</span>
        <Link to="/signup">
          <span className="ml-2 text-[12px]">Sign Up</span>
        </Link>
      </div>
    </section>
  )
}

export default ForgetPassword