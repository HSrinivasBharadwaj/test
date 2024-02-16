import React from 'react'
import banner from '../banner.png'

const Header = () => {
  return (
    <div className='shadow-md bg-blue-500 text-white p-5 flex justify-center items-center'>
      <img src={banner} alt="Movie Logo" className="h-auto w-20 mr-2" /> 
      <h1 className='font-extrabold'>Movie Search</h1>
    </div>
  )
}

export default Header