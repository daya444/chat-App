import React, { useEffect, useRef } from 'react';
import usegetMessages from '../../hooks/usegetMessages';
import { useListenMessages } from '../../hooks/useListenMessage';
import MessageSkeleton from '../skeletons/skeletons';
import ChatMessage from './chatMessage';

const Messages = () => {
  const { loading, messages } = usegetMessages();
  const lastMessageRef = useRef();
  useListenMessages()

  

  useEffect(() => {
    if (messages.length > 0) {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length > 0 && messages?.map((message, idx) => (
        <div 
          key={message._id} 
          ref={idx === messages.length - 1 ? lastMessageRef : null} // Only apply ref to the last message
        >
          <ChatMessage message={message} />
          
        </div>
      ))}

      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start a conversation</p>
      )}
    </div>

    
  );
};

export default Messages;
