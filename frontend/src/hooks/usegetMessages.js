import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../../zustand/useConversation';


const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/api/messages/${selectedConversation._id}`, {
                    withCredentials: true
                });
                const data = res.data;

                
                

                if (data.error) {
                    throw new Error(data.error);
                }

                setMessages(data);
                
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);


    return { loading, messages };
}

export default useGetMessages;
