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
      <div
      className="text-[30px] font-bold">Forget Password</div>
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
                  <dt className='mb-1'>Email</dt>
                  <dd className='text-black'>
                    <Field type="text" name="email" placeholder="Email"
                    className="w-[300px] h-[50px] bg-[#18181B] border border-[#424248] pl-2"/>
                  </dd>
                  <dd className='text-red-500'><ErrorMessage name='email'/></dd>
                  <dt className="mb-1 mt-5">New Password</dt>
                  <dd className='text-black'>
                    <Field type="password" name="newPassword" placeholder="New Password"
                    className="w-[300px] h-[50px] bg-[#18181B] border border-[#424248] pl-2"/>
                  </dd>
                  <dd className='text-red-500'><ErrorMessage name='newPassword'/></dd>
                </dl>
                <button 
                className="bg-[#DB1A5A] w-[300px] h-[50px] mt-5 rounded">Confirm</button>
              </div>
            }
          </Form>
        </Formik>
      </div>
      <div className="flex justify-center place-items-center mt-10">
        <Link to="/">
          <span className="text-[#C3C3C6] ml-2">Sign In</span>
        </Link>
        <span className="ml-2 ">|</span>
        <Link to="/signup">
          <span className="text-[#C3C3C6] ml-2">Sign Up</span>
        </Link>
      </div>
    </section>
  )
}

export default ForgetPassword