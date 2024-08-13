import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { useAuthContext } from '../context/authcontext'

const useSignup = () => {


    const [loading,setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const signup = async({ fullName,username,password,confirmPassword,gender }) => {
        const success = handleInputError({fullName,username,password,confirmPassword,gender })

    if(!success)return;

    setLoading(true)

    try {
        const res = await axios.post('http://localhost:8000/api/auth/signup', {
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }, {
          withCredentials: true, // Include credentials in the request
        });
        
      const data = res.data

      if(data){
        
       
       
        console.log(data)
      }if(data.error){
        throw new Error(data.error)

      }
      localStorage.setItem("chat-user",JSON.stringify(data))
      setAuthUser(data)

    }
    catch(e) {
        if (e.response) {
            // Check if the server response has a specific error message
            const errorMessage = e.response.data.error || e.message;
            toast.error(errorMessage);
        } else {
            toast.error(e.message);
        }
    }
    
    finally{
        setLoading(false)
    }
    }



    return { signup, loading }


 
}

export default useSignup



function handleInputError  ({fullName,username,password,confirmPassword,gender }){
    if(!fullName || !username || !password || !gender || !confirmPassword){
        toast.error("please fill all fields")
        return false 
    }

    if(password !==confirmPassword){
        toast.error("passwords do not match")
        return false
    }

    if(password.length < 6){
        toast.error("password should be at least 6 characters long")
        return false
    }

    return true
}