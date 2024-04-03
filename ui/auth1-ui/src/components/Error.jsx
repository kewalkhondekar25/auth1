import React from 'react'
import error from "../assets/error.svg"

const Error = () => {
  return (
    <div className='flex justify-center place-items-center h-[500px]'>
      <img src={error} alt="error" height={300} width={300}
       />
    </div>
  )
}

export default Error