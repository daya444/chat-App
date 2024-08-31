import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from './useLogin';

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/api/users`, {
          withCredentials: true, // Important: allows sending cookies with the request
        });
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setConversation(data);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    getConversation();
  }, []);

  return { conversation, loading };
};

export default useGetConversation;
