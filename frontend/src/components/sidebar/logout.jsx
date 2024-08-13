import React from 'react'
import { SlLogout } from "react-icons/sl";
import useLogout from '../../hooks/useLogout';


const logout = () => {

  const {loading,logout} =useLogout()
  return (
    <div className='mt-auto'>
     {!loading ? (
       <SlLogout className='w-6 h-6 text-white cursor-pointer'
       onClick={logout}
       
       />
     ) : (
      <span className='loading loading-spinner'></span>
     )}
    </div>
  )
}

export default logout