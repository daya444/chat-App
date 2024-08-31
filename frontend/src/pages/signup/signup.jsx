
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/usesignup'

import { GenderSelection } from './genderSelection'

const SignUp = () => {

  const [inputs,setinput]= useState({

    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  })

  const { signup, loading }= useSignup()

  

  const handlesubmit = async(e) =>{
     
        e.preventDefault() 
        await signup(inputs) 
        console.log("hitting")
      }

  const handlecheckbox = (gender)=> {
     setinput({...inputs, gender })
  }




  return(



  <div className='label  p-2 '>

    <div className='w-full  p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '>

      <h1 className='text-3xl font-semibold text-center text-gray-300 '>
        SignUp
        <span className='text-black pl-3 '>ChatApp</span>
      </h1>

      
        <div>
          <label className='label p-2 '>
            <span className='text-base label-text '>Full Name</span>
          </label>
          <input type='text' className='input w-full  input-bordered h-10' placeholder=' Fullname'
          value={inputs.fullName}
          onChange={(e) => setinput({...inputs, fullName: e.target.value })}
          />
        </div>


        <div>
          <label className='label p-2 '>
            <span className='text-base label-text '>User Name</span>
          </label>
          <input type='text' className='input w-full  input-bordered h-10' placeholder=' User name' 
          value={inputs.username}
          onChange={(e) => setinput({...inputs, username: e.target.value })}
          />
        </div>

        <div>
          <label className='label p-2 '>
            <span className='text-base label-text '>Password</span>
          </label>
          <input type='password' className='input w-full  input-bordered h-10' placeholder=' Password' 
          value={inputs.password}
          onChange={(e) => setinput({...inputs, password: e.target.value })}
          />
        </div>

        <div>
          <label className='label p-2 '>
            <span className='text-base label-text '>Confirm Password</span>
          </label>
          <input type='password' className='input w-full  input-bordered h-10' placeholder=' Confirm Password'
          value={inputs.confirmPassword}
          onChange={(e)=>setinput({...inputs,confirmPassword: e.target.value})}
          />
        </div>

       <GenderSelection oncheckboxchange= {handlecheckbox} selectedGender = {inputs.gender}/>



        <Link to='/login' className='mt-3 hover:underline text-sm hover:!text-blue-600 inline-block'>
          Already have an account?
        </Link>


       
            <button  className='btn btn-block btn-sm mt-2'
            onClick={handlesubmit}
          
            disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Signup"} 
              </button>
         





      
    </div>

  </div>
)}

export default SignUp

