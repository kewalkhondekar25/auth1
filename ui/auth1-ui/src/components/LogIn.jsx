import axios from "axios";
import { useEffect, useState } from "react"

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
    console.log(userData);
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
        setError(error.response.status)
      }
    }
  }
  
  return (
    <section>
      <dl>
        <dt>Email</dt>
        <dd><input type="text" 
        className="text-black" placeholder="Email" onChange={handleUserEmail}/></dd>  
        <dt>Password</dt>
        <dd><input type="password" 
        className="text-black" placeholder="Password" onChange={handlePassword}/></dd>
      </dl>    
      <button onClick={handleLogInClick}
      className="bg-slate-500 w-44 mt-5">Sign In</button>
      {error && <p>Invalid Credentials</p>}
    </section>
  )
}

export default LogIn