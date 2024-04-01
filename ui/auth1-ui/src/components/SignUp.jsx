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
    <section className="flex flex-col justify-center place-items-center mt-20">
      <div>Sign Up</div>
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
                  <dt>First Name</dt>
                  <dd className="text-black"><Field type="text" name="username" /></dd>
                  <dd className='text-red-500'><ErrorMessage name="username"/></dd>
                  <dt>Last Name</dt>
                  <dd className="text-black"><Field type="text" name="fullName"/></dd>
                  <dd className='text-red-500'><ErrorMessage name="fullName"/></dd>
                  <dt>Email</dt>
                  <dd className="text-black"><Field type="email" name="email"/></dd>
                  <dd className='text-red-500'><ErrorMessage name="email"/></dd>
                  <dt>Password</dt>
                  <dd className="text-black"><Field type="password" name="password"/></dd>
                  <dd className='text-red-500'><ErrorMessage name="password"/></dd>
                </dl>
                <button 
                className="bg-[#DB1A5A] w-[180px] mt-5">Sign Up</button>
              </div>
            }
          </Form>
        </Formik>
      </div>
      <div className="flex justify-center place-items-center mt-3">
        <span>Already got an account?</span>
        <Link to="/">
          <span className="ml-2 text-[12px]">Sign In</span>
        </Link>
      </div>
    </section>
  )
}

export default SignUp