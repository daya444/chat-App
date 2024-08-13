import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../../zustand/useConversation';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false); 
    const { selectedConversation, messages, setMessages } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            // Retrieve the token from storage or state
            const token = localStorage.getItem('jwt'); // Adjust this if you're storing the token elsewhere

            const res = await axios.post(
                `http://localhost:8000/api/messages/send/${selectedConversation._id}`, 
                { message },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                    withCredentials: true, 
                }
            );

            const data = res.data;
            if (data.error) {
                throw new Error(data.error);
            }
            setMessages([...messages, data]);
            
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
