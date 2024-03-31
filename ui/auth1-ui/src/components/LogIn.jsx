import axios from "axios";
import { useState } from "react"
import { Link } from 'react-router-dom'


const LogIn = () => {

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState();

  const handleUserEmail = (e) => {
    setUserData(prev => ({...prev, email: e.target.value}))
  };
  const handlePassword = (e) => {
    setUserData(prev => ({...prev, password: e.target.value}))
  };
  const handleLogInClick = () => {
    handleLogIn();
  };
  const handleLogIn = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/login", userData);
      if(response.status === 200){
        alert("LogIn Successfull");
      }
    } catch (error) {
      console.error(error);
      if(error){
        setError(error.response.data.message)
      }
    }
  }
  
  return (
    <section className="flex flex-col justify-center place-items-center mt-20">
      <div>Sign In</div>
      <dl>
        <dt>Email</dt>
        <dd><input type="text" 
        className="text-black" placeholder="Your Email" onChange={handleUserEmail}/></dd>  
        <dt>Password</dt>
        <dd><input type="password" 
        className="text-black" placeholder="Your Password" onChange={handlePassword}/></dd>
      </dl>    
      <button onClick={handleLogInClick}
      className="bg-[#DB1A5A] w-44 mt-5">Sign In</button>
      {error}
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

export default LogIn