import React from 'react'
import useConversation from '../../../zustand/useConversation'
import { useSocketContext } from '../../context/socketContext'


const Conversation = ({conversation,emoji,lastIDX}) => {

    const {selectedConversation,setSelectedConversation} = useConversation()
    const {onLineUser} = useSocketContext()
    const isOnline = onLineUser.includes(conversation._id)

    const isSelected = selectedConversation?._id ===conversation._id
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-400 rounded p-2 py-1 cursor-pointer
    
    ${isSelected ? 'bg-blue-500 ': ""}`
    }
    onClick={()=> setSelectedConversation(conversation)}
    >

         
        <div className={`avatar ${isOnline ? "online" : ""}`}>

            <div className='w-12 rounded-full border bg-black'>
                <img src={conversation.profilePic} alt='user avatar'/>
            </div>

        </div>

        <div className=' flex flex-col flex-1'>

            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                <span>{emoji}</span>
            </div>

        </div>

    </div>



     {!lastIDX &&   <div className='bg-black divider py-0 my-0 h-1'/>}
    </>
  )
}

export default Conversation