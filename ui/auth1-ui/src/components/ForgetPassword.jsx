import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as yup from "yup";
import toast from 'react-hot-toast';


const ForgetPassword = () => {

    const navigate = useNavigate();
    const [error, setError] = useState();
    const handleForgetPassword = async(payload) => {
    const loadingToast = toast.loading("Updating Password...");
      try {
        const response = await axios.post("http://localhost:8080/api/v1/users/forgetpassword", payload);
        if(response.status === 200){
          toast.dismiss(loadingToast);
          navigate("/");
          toast.success("Password Changed Successfully")
        }
      } catch (error) {
        console.log(error);
        toast.dismiss(loadingToast);
        setError(error.response.data.message);
        toast.error("Invalid Email Address");
      }
    }
    
  return (
    <section className="flex flex-col justify-center place-items-center mt-20">
      <div>Forget Password</div>
      <div>
        <Formik 
        initialValues={{
          email: "",
          newPassword: ""
        }}
        validationSchema={yup.object({
          email: yup.string().email().required(),
          newPassword: yup.string().required().min(3, "Minimum 3 Charecters Needed")
        })}
        onSubmit={values => handleForgetPassword(values)}>
          <Form>
            {
              <div>
                <dl>
                  <dt>Email</dt>
                  <dd className='text-black'><Field type="text" name="email"/></dd>
                  <dd className='text-red-500'><ErrorMessage name='email'/></dd>
                  <dt>New Password</dt>
                  <dd className='text-black'><Field type="password" name="newPassword"/></dd>
                  <dd className='text-red-500'><ErrorMessage name='newPassword'/></dd>
                </dl>
                <button 
                className="bg-[#DB1A5A] w-44 mt-5">Confirm</button>
              </div>
            }
          </Form>
        </Formik>
      </div>
      {/* <dl>
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
        onClick={handleForgetPassword}>Confirm</button> */}
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