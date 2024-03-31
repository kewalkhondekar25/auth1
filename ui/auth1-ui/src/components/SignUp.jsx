import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {

  const [userData, setUserData] = useState({
    "username": "",
    "email": "",
    "password": "",
    "fullName": ""
  });
  const [error, setError] = useState();


  const handleFirstName = (e) => {
    setUserData(prev => ({...prev, username: e.target.value}))
  };
  const handleLastName = (e) => {
    setUserData(prev => ({...prev, fullName: e.target.value}))
  };
  const handleEmail = (e) => {
    setUserData(prev => ({...prev, email: e.target.value}))
  };
  const handlePassword = (e) => {
    setUserData(prev => ({...prev, password: e.target.value}))
  };

  const handleSignup = () => {
    handleRegister();
    console.log(userData);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/register", userData);
      if(response.status === 200){
        return alert("User Register Successfully");
      }
      if(response.status === 409){
        return alert("User with username or email already exists");
      }
    } catch (error) {
      console.error(error);
      setError(error.response.status)
    }
  };

  return (
    <section className="flex flex-col justify-center place-items-center mt-20">
      <div>Sign Up</div>
      <dl>
        <dt>First Name</dt>
        <dd><input type="text" 
          className="text-black" placeholder="Your First Name"
          onChange={handleFirstName}/></dd>  
        <dt>Last Name</dt>
        <dd><input type="text" 
          className="text-black" placeholder="Your Last Name"
          onChange={handleLastName} /></dd>  
        <dt>Email</dt>
        <dd><input type="text" 
          className="text-black" placeholder="Your Email"
          onChange={handleEmail} /></dd>  
        <dt>Password</dt>
        <dd><input type="password" 
          className="text-black" placeholder="Your Password"
          onChange={handlePassword} /></dd>
      </dl>    
      <button
        className="bg-[#DB1A5A] w-44 mt-5"
        onClick={handleSignup}>Sign In
      </button>
      {error && <p>Field cannot be empty</p>}
      <div className="flex justify-center place-items-center mt-10">
        <span>Already got an account?</span>
        <Link to="/">
          <span className="ml-2 text-[12px]">Sign Up</span>
        </Link>
      </div>
    </section>
  )
}

export default SignUp