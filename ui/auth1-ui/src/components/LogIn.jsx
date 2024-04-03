import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as yup from "yup"
import {toast} from "react-hot-toast";
import {useCookies} from "react-cookie"
import signInImg from '../assets/signIn.svg';
import { useEffect } from "react";


const LogIn = () => {

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleLogin = async(payload) => {
  const loadingToast = toast.loading("Signing in progress...");
    try {
      loadingToast;
      const response = await axios.post("https://auth1.itehealthyme.in/api/v1/users/login", payload);
      console.log(response.data.data.email);
      if(response.status === 200){
        toast.dismiss(loadingToast);
        toast.success("SignIn Success");
        setCookie("your-cookie", response.data.accessToken);
        setCookie("first-id", response.data.data.username);
        setCookie("second-id", response.data.data.email);
        navigate("/profile");
        return 
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      toast.dismiss(loadingToast);
      toast.error("Invalid Credentials")
    }
  };

  return (
    <section className=" relative flex flex-col justify-center place-items-center mt-14
    lg:mt-[125px]">
      <div className="text-[30px] font-bold">Sign In</div>
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
                  <dt className="mb-1">Email</dt>
                  <dd>
                    <Field name="email" type="text" placeholder="Email"
                    className="w-[300px] h-[50px] bg-[#18181B] border border-[#424248] pl-2
                    sm:w-[500px]"/>
                  </dd>
                  <dd className="text-red-500"><ErrorMessage name="email"/></dd>
                  <dt className="mb-1 mt-5">Password</dt>
                  <dd>
                    <Field name="password" type="password" placeholder="Password"
                    className="w-[300px] h-[50px] bg-[#18181B] border border-[#424248] pl-2
                    sm:w-[500px]"/></dd>
                  <dd className="text-red-500"><ErrorMessage name="password"/></dd>
                </dl>
                <button 
                className="bg-[#DB1A5A] w-[300px] h-[50px] mt-5 rounded
                sm:w-[500px]">Sign In</button>
              </div>
            }
          </Form>
        </Formik>
      </div>
      <div className="flex justify-center place-items-center mt-10">
        <Link to="/forgetpassword">
          <span 
          className="text-[#C3C3C6] ml-2 ">Forget Password?</span>
        </Link>
        <span className="ml-2 text-[#2C2C30]">|</span>
        <Link to="/signup">
          <span 
          className="text-[#C3C3C6] ml-2 ">Sign Up</span>
        </Link>
      </div>
      <img 
      className="absolute bottom-[-144px] -left-8
      sm:h-[300px] sm:w-[300px] sm:bottom-[-380px]
      md:h-[400px] md:w-[400px] md:bottom-[-360px]
      lg:h-[350px] lg:w-[350px] lg:bottom-[-75px]
      xl:bottom-0
      2xl:bottom-0"
      src={signInImg} height={180} width={180} />
    </section>
  )
}

export default LogIn