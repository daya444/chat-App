import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/authcontext';
import { api } from './useLogin';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${api}/api/auth/logout`, {}, {
                withCredentials: true // Ensure cookies are sent
            });

            if (res.status === 200) {
                localStorage.removeItem('chat-user');
                setAuthUser(null);
                toast.success("Logged out successfully");
            } else {
                throw new Error('Failed to log out');
            }
        } catch (e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    return { logout, loading };
};

export default useLogout;
