import axios from "axios";
import { useState } from "react"
import { Link } from 'react-router-dom'
import {useFormik, Formik, Form, Field, ErrorMessage} from "formik"
import * as yup from "yup"


const LogIn = () => {

  const [error, setError] = useState();
  const handleLogin = async(payload) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/login", payload)
      if(response.status === 200){
        alert("Login Success");
        setError("")
        return 
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  
  return (
    <section className="flex flex-col justify-center place-items-center mt-20">
      <div className="text-2xl">Sign In</div>
      <div>
        <Formik 
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={
          yup.object({
            email: yup.string().email("Invalid Email").required("Email is Required"),
            password: yup.string().required("Password Required")
          })
        }
        onSubmit={values => handleLogin(values)}>
          <Form>
            {
              <div>
                <dl>
                  <dt>Email</dt>
                  <dd className="text-black"><Field name="email" type="text" placeholder="Your Email"/></dd>
                  <dd className="text-red-500"><ErrorMessage name="email"/></dd>
                  <dt>Password</dt>
                  <dd className="text-black"><Field name="password" type="password" placeholder="Your Password"/></dd>
                  <dd className="text-red-500"><ErrorMessage name="password"/></dd>
                </dl>
                <button className="bg-[#DB1A5A] w-[180px] mt-10">Sign In</button>
                <div>
                  {error}
                </div>
              </div>
            }
          </Form>
        </Formik>
      </div>
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