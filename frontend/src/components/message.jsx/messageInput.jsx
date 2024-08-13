import React, { useState } from 'react'
import { IoSendSharp } from "react-icons/io5";
import useSendMessage from '../../hooks/useSendMessage';

export const MessageInput = () => {

  const [message,setMessage] = useState("")

  const {sendMessage, loading} = useSendMessage()

  const HandleSubmit = async (e) => {
      e.preventDefault()
      if(!message) return;
      await sendMessage(message)
      setMessage("")
    }
  return (
    <form className='px-4 my-3 ' onSubmit={HandleSubmit}>
        <div className='w-full relative'>
            <input 
            type='text' 
            className='border border-gray-500 rounded-lg w-full p-2.5 block text-sm' 
            placeholder='Type a message...'
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            
            />

            <button type='submit' className='absolute inset-y-0 end-0 flex items-center mr-2'>
              {loading ? <div className='loading loading-spinner'></div> : <IoSendSharp/>}
            </button>
        </div>

    </form>
  )
}
  