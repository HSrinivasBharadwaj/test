import React from 'react'
import banner from '../banner.jpg'

const Header = () => {
  return (
    <div className='shadow-md bg-blue-500 text-white p-5 flex justify-center items-center'>
      <img src={banner} alt="Movie Logo" className="h-auto w-28 mr-2" /> 
      <h1 className='font-extrabold'>Movie Search</h1>
    </div>
  )
}

export default Header