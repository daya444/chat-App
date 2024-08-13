import React from 'react'
import { BsFillSearchHeartFill } from "react-icons/bs";

 const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
        <input type='text' placeholder='search' className='input input-bordered '/>
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
           <BsFillSearchHeartFill  className='h-6 w-6 outline-none'/>
        </button>

    </form>
  )
}

export default SearchInput