import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useAuthContext } from '../context/authcontext';




const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    if (!handleInputError({ username, password })) {
      return false;
    }

    setLoading(true);
    try {
      const res = await axios.post(`/api/auth/login`, {
        username,
        password,
      }, {
        withCredentials: true 
      });

      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user",JSON.stringify(data))
      setAuthUser(data);
      return true;
    } catch (e) {
      if (e.response) {
        const errorMessage = e.response.data.error || e.message;
        toast.error(errorMessage);
      } else {
        toast.error(e.message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputError({ username, password }) {
  if (!username || !password) {
    toast.error('Please fill all fields');
    return false;
  }
  return true;
}
