import React from 'react'
import useGetConversation from '../../hooks/useGetConversation'
import { getRandomEmoji } from '../../utils/emoji'
import Conversation from "./conversation"

export const ListOfUser = () => {
  const { loading, conversation } = useGetConversation()
  

  return (
    <div className='flex flex-col overflow-auto'>

      {conversation.map((conversations,idx)=>(

        
        <Conversation key={conversations?._id}
        conversation={conversations}
        emoji={getRandomEmoji()}
        lastIDX={idx === conversation.length -1}
        
  
        />
      ))}
     



     {loading ? <span className='loading loading-spinner'></span> :null}
    </div>
  )
}
