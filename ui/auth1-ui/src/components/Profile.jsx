import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import profile from "../assets/profile.svg"

const Profile = () => {
    
    const [cookies, setCookie, removeCookie] = useCookies();
    const [name, setName] = useState();
    const navigate = useNavigate();

    const handleSignOut = () => {
        removeCookie("first-id");
        removeCookie("second-id");
        removeCookie("your-cookie");
        navigate("/")
    }

    useEffect(() => {
        if(cookies["your-cookie"] === undefined){
            return navigate("/");
        }
        console.log(name);
        setName(cookies["first-id"])
        toast(`Hello`, {
            icon: '🤗',
          });
    }, []);
  return (
    <div className='relative flex flex-col justify-center gap-5 items-center h-[500px]'>
        <div></div>
        <div className='text-[25px] capitalize'>Welcome</div>
        <div className='text-[25px] capitalize'>{name}</div>
        <button 
        className="bg-[#DB1A5A] w-[300px] h-[50px] mt-5 rounded
        sm:w-[500px]"
        onClick={handleSignOut}>Sign Out</button>
        <img src={profile} alt="img" height={100} width={100}
        className="absolute top-10" />
    </div>
  )
}

export default Profile