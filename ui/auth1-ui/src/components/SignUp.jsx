import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import toast from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState();
  const handleRegister = async(payload) => {
  const loadingToast = toast.loading("Signup in Progress...")
    try {
      loadingToast;
      const response = await axios.post("http://localhost:8080/api/v1/users/register", payload);
      if(response.status === 200){
        // alert("user register successfully");
        toast.dismiss(loadingToast);
        navigate("/");
        toast.success(`${response.data.message}`)
        setError("");
        return; 
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      setErrorMsg(error.response.data.message);
      toast.error("Username or email already exists")
    }
  };

  return (
    <section className="flex flex-col justify-center place-items-center mt-6">
      <div className="text-[30px] font-bold">Sign Up</div>
      <div>
        <Formik 
        initialValues={{
            username: "",
            email: "",
            password: "",
            fullName: ""
          }}
          validationSchema={yup.object({
            username: yup.string().required().min(3, "Minimum 3 Charecters Required"),
            email: yup.string().email().required(),
            password: yup.string().required(),
            fullName: yup.string().required()
          })}
          onSubmit={values => handleRegister(values)}>
          <Form>
            {
              <div>
                <dl>
                  <dt className="mb-1">First Name</dt>
                  <dd>
                    <Field type="text" name="username" placeholder="First Name"
                    className="w-[300px] h-[50px] bg-[#18181B] border border-[#424248] pl-2
                    sm:w-[500px]"/>
                  </dd>
                  <dd className='text-red-500'><ErrorMessage name="username"/></dd>
                  <dt className="mb-1 mt-5">Last Name</dt>
                  <dd>
                    <Field type="text" name="fullName" placeholder="Last Name"
                    className="w-[300px] h-[50px] bg-[#18181B] border border-[#424248] pl-2
                    sm:w-[500px]"/>
                  </dd>
                  <dd className='text-red-500'><ErrorMessage name="fullName"/></dd>
                  <dt className="mb-1 mt-5">Email</dt>
                  <dd>
                    <Field type="email" name="email" placeholder="Email"
                    className="w-[300px] h-[50px] bg-[#18181B] border border-[#424248] pl-2
                    sm:w-[500px]"/>
                  </dd>
                  <dd className='text-red-500'><ErrorMessage name="email"/></dd>
                  <dt className="mb-1 mt-5">Password</dt>
                  <dd>
                    <Field type="password" name="password" placeholder="Password"
                    className="w-[300px] h-[50px] bg-[#18181B] border border-[#424248] pl-2
                    sm:w-[500px]"/>
                  </dd>
                  <dd className='text-red-500'><ErrorMessage name="password"/></dd>
                </dl>
                <button 
                className="bg-[#DB1A5A] w-[300px] h-[50px] mt-5 rounded
                sm:w-[500px]">Sign Up</button>
              </div>
            }
          </Form>
        </Formik>
      </div>
      <div className="flex justify-center place-items-center mt-3">
        <span
        className='text-[#C3C3A4]'>Already got an account?</span>
        <Link to="/">
          <span 
          className="text-[#C3C3A4] ml-2 underline">Sign In</span>
        </Link>
      </div>
    </section>
  )
}

export default SignUp