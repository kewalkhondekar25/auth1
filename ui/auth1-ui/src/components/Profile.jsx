import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
    <div className='flex flex-col justify-center gap-5 place-items-center h-[200px]'>
        <div></div>
        <div>Welcome</div>
        <div>{name}</div>
        <button 
        className='bg-[#DB1A5A] w-[180px]'
        onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default Profile